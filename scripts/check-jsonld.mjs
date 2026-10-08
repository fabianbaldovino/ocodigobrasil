import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://ocodigobrasil.com.br';

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
  const disallowed = ['aggregateRating', 'review', 'offers', 'isbn', 'bookFormat'];
  if (Array.isArray(obj)) {
    obj.forEach(item => checkDisallowedKeys(item, file));
  } else if (obj !== null && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      if (disallowed.includes(key)) {
        console.error(`ERRO [${file}]: Chave ${key} não permitida sem dados confirmados pelo dono.`);
        process.exit(1);
      }
      checkDisallowedKeys(obj[key], file);
    }
  }
}

function checkTodoDado(obj, file) {
  if (typeof obj === 'string') {
    if (obj.includes('TODO_DADO')) {
      console.error(`ERRO [${file}]: Valor contém TODO_DADO.`);
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
          if (val !== 'https://www.fabian.art.br' && !val.startsWith(SITE_URL)) {
            console.error(`ERRO [${file}]: Chave ${key} possui URL inválida/relativa: ${val}`);
            process.exit(1);
          }
        } else if (Array.isArray(val)) {
          val.forEach(v => {
            if (typeof v === 'string' && v !== 'https://www.fabian.art.br' && !v.startsWith(SITE_URL)) {
              console.error(`ERRO [${file}]: Chave ${key} possui URL inválida/relativa: ${v}`);
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
  const content = fs.readFileSync(file, 'utf8');
  const scripts = content.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  if (!scripts) continue;

  const foundTypes = [];

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
        const textOnly = normalize(content.replace(/<[^>]*>/g, ' '));
        for (const qa of node.mainEntity) {
          const q = normalize(qa.name);
          const a = normalize(qa.acceptedAnswer.text);
          if (!textOnly.includes(q)) {
            console.error(`ERRO [${file}]: Pergunta do FAQ não encontrada no HTML visível: ${q}`);
            process.exit(1);
          }
          if (!textOnly.includes(a)) {
            console.error(`ERRO [${file}]: Resposta do FAQ não encontrada no HTML visível: ${a}`);
            process.exit(1);
          }
        }
      }

      if (node['@type'] === 'Article') {
        const h1Text = extractH1(content);
        if (!h1Text || h1Text !== normalize(node.headline)) {
          console.error(`ERRO [${file}]: Headline do Article ("${normalize(node.headline)}") não confere com H1 ("${h1Text}").`);
          process.exit(1);
        }
        // Extract front matter date for verification?
        // Wait, the front matter date is inside the markdown files. The instructions say "datePublished igual à date do front matter".
        // I should read the markdown file to check it!
        // The slug can be extracted from the file path.
        const parts = file.split(path.sep);
        const slug = parts[parts.length - 2];
        const mdFile = path.join('content', 'artigos', slug + '.md');
        if (fs.existsSync(mdFile)) {
          const mdContent = fs.readFileSync(mdFile, 'utf8');
          const dateMatch = mdContent.match(/date:\s*"([^"]+)"/);
          if (dateMatch) {
            if (node.datePublished !== dateMatch[1]) {
              console.error(`ERRO [${file}]: datePublished ("${node.datePublished}") não confere com front matter ("${dateMatch[1]}").`);
              process.exit(1);
            }
          }
        }
      }
    }
  }

  console.log(`${file} | Tipos: ${foundTypes.join(', ')}`);
}

console.log("Validação JSON-LD aprovada.");
