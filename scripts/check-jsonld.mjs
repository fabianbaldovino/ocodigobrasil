import fs from 'fs';
import path from 'path';

// Extract SITE_URL from src/lib/site.ts
const siteContent = fs.readFileSync(path.join('src', 'lib', 'site.ts'), 'utf8');
const match = siteContent.match(/export const SITE_URL = ["']([^"']+)["']/);
if (!match) {
  console.error('ERRO: Nao foi possivel ler SITE_URL de src/lib/site.ts');
  process.exit(1);
}
const SITE_URL = match[1];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

function checkDisallowedKeys(obj, file) {
  const disallowed = ['aggregateRating', 'review', 'offers', 'isbn', 'bookFormat', 'price', 'priceCurrency', 'availability'];
  const disallowedTypes = ['Book', 'Product', 'Offer'];
  
  if (Array.isArray(obj)) {
    obj.forEach(item => checkDisallowedKeys(item, file));
  } else if (obj !== null && typeof obj === 'object') {
    if (obj['@type'] && disallowedTypes.includes(obj['@type'])) {
      console.error(`ERRO [${file}]: @type ${obj['@type']} nao permitido sem dados confirmados pelo dono.`);
      process.exit(1);
    }
    for (const key of Object.keys(obj)) {
      if (disallowed.includes(key)) {
        console.error(`ERRO [${file}]: Chave ${key} nao permitida sem dados confirmados pelo dono.`);
        process.exit(1);
      }
      checkDisallowedKeys(obj[key], file);
    }
  }
}

function checkTodoDado(obj, file) {
  if (typeof obj === 'string') {
    if (obj.includes('TODO_DADO')) {
      console.error(`ERRO [${file}]: Valor contem TODO_DADO.`);
      process.exit(1);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(item => checkTodoDado(item, file));
  } else if (obj !== null && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      checkTodoDado(obj[key], file);
    }
  }
}

function checkUrls(obj, file) {
  const urlKeys = ['url', 'image', '@id'];
  if (Array.isArray(obj)) {
    obj.forEach(item => checkUrls(item, file));
  } else if (obj !== null && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      if (urlKeys.includes(key)) {
        let val = obj[key];
        if (typeof val === 'string') {
          if (val !== 'https://www.fabian.art.br' && val !== SITE_URL && !val.startsWith(SITE_URL + '/')) {
            console.error(`ERRO [${file}]: Chave ${key} possui URL invalida/relativa: ${val}`);
            process.exit(1);
          }
        } else if (Array.isArray(val)) {
          val.forEach(v => {
            if (typeof v === 'string' && v !== 'https://www.fabian.art.br' && v !== SITE_URL && !v.startsWith(SITE_URL + '/')) {
              console.error(`ERRO [${file}]: Chave ${key} possui URL invalida/relativa: ${v}`);
              process.exit(1);
            }
          });
        }
      }
      checkUrls(obj[key], file);
    }
  }
}

function normalize(str) {
  return str.replace(/\s+/g, ' ').trim();
}

function unescapeHtml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'");
}

function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  // Remove inner HTML tags to get raw text
  let text = normalize(m[1].replace(/<[^>]*>/g, ''));
  return unescapeHtml(text);
}

const files = walk('out').filter(f => f.endsWith('index.html'));

for (const file of files) {
  // Skip 404 page
  if (file.endsWith('404.html') || file.includes('404')) continue;
  // legally pages skip
  if (file.includes('termos') || file.includes('privacidade') || file.includes('reembolso')) continue;

  const content = fs.readFileSync(file, 'utf8');
  const scripts = content.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  if (!scripts) {
    if (file === path.join('out', 'index.html') || (file.includes(path.join('conteudo')) && !file.endsWith(path.join('conteudo', 'index.html')))) {
      console.error(`ERRO [${file}]: JSON-LD ausente.`);
      process.exit(1);
    }
    continue;
  }

  let foundTypes = [];

  for (const scriptTag of scripts) {
    const inner = scriptTag.match(/>([\s\S]*?)<\/script>/i)[1];
    let data;
    try {
      data = JSON.parse(inner);
    } catch (e) {
      console.error(`ERRO [${file}]: Falha no JSON.parse do ld+json.`);
      console.error(e.message);
      process.exit(1);
    }

    checkDisallowedKeys(data, file);
    checkTodoDado(data, file);
    checkUrls(data, file);

    const graph = data['@graph'] ? data['@graph'] : (Array.isArray(data) ? data : [data]);
    
    for (const node of graph) {
      if (node['@type']) {
        foundTypes.push(node['@type']);
      }
      
      if (node['@type'] === 'FAQPage' && node.mainEntity) {
        let htmlNoScripts = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
        // Apply unescapeHtml to the visible text for accurate comparison
        const textOnly = unescapeHtml(normalize(htmlNoScripts.replace(/<[^>]*>/g, ' ')));
        for (const qa of node.mainEntity) {
          const q = unescapeHtml(normalize(qa.name));
          const a = unescapeHtml(normalize(qa.acceptedAnswer.text));
          if (!textOnly.includes(q)) {
            console.error(`ERRO [${file}]: Pergunta do FAQ nao encontrada no HTML visivel: ${q}`);
            process.exit(1);
          }
          if (!textOnly.includes(a)) {
            console.error(`ERRO [${file}]: Resposta do FAQ nao encontrada no HTML visivel: ${a}`);
            process.exit(1);
          }
        }
      }

      if (node['@type'] === 'Article') {
        const h1Text = extractH1(content);
        if (!h1Text || h1Text !== normalize(node.headline)) {
          console.error(`ERRO [${file}]: Headline do Article ("${normalize(node.headline)}") nao confere com H1 ("${h1Text}").`);
          process.exit(1);
        }
        
        const parts = file.split(path.sep);
        const slug = parts[parts.length - 2];
        const mdFile = path.join('content', 'artigos', slug + '.md');
        if (fs.existsSync(mdFile)) {
          const mdContent = fs.readFileSync(mdFile, 'utf8');
          const dateMatch = mdContent.match(/date:\s*(['"]?)([^'"]+)\1/);
          if (dateMatch) {
            const dateVal = dateMatch[2].trim();
            if (node.datePublished !== dateVal) {
              console.error(`ERRO [${file}]: datePublished ("${node.datePublished}") nao confere com front matter ("${dateVal}").`);
              process.exit(1);
            }
          }
        }
      }
    }
  }

  // Expectation table
  if (file === path.join('out', 'index.html')) {
    const required = ['WebSite', 'Person', 'CreativeWork', 'FAQPage'];
    for (const req of required) {
      if (!foundTypes.includes(req)) {
        console.error(`ERRO [${file}]: Tipo obrigatorio ${req} ausente.`);
        process.exit(1);
      }
    }
  } else if (file.includes(path.join('conteudo')) && !file.endsWith(path.join('conteudo', 'index.html'))) {
    const required = ['Person', 'Organization', 'Article'];
    for (const req of required) {
      if (!foundTypes.includes(req)) {
        console.error(`ERRO [${file}]: Tipo obrigatorio ${req} ausente.`);
        process.exit(1);
      }
    }
  }

  console.log(`${file} | Tipos: ${foundTypes.join(', ')}`);
}

console.log("Validacao JSON-LD aprovada.");
