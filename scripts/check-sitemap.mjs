import fs from 'fs';
import path from 'path';

function checkSitemap() {
  const filePath = path.join('out', 'sitemap.xml');
  if (!fs.existsSync(filePath)) {
    console.error('ERRO: out/sitemap.xml não encontrado.');
    process.exit(1);
  }

  const xml = fs.readFileSync(filePath, 'utf8');
  
  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    console.error('ERRO: Declaração XML inválida ou ausente.');
    process.exit(1);
  }

  if (!xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    console.error('ERRO: xmlns ausente ou inválido.');
    process.exit(1);
  }

  if ((xml.match(/<url>/g) || []).length !== (xml.match(/<\/url>/g) || []).length) {
    console.error('ERRO: Tags <url> desbalanceadas.');
    process.exit(1);
  }

  if (xml.includes('<changefreq>') || xml.includes('<priority>')) {
    console.error('ERRO: Elementos <changefreq> ou <priority> não devem estar no sitemap.');
    process.exit(1);
  }

  const siteTs = fs.readFileSync(path.join('src', 'lib', 'site.ts'), 'utf8');
  const siteUrlMatch = siteTs.match(/SITE_URL = '(.*?)'/);
  if (!siteUrlMatch) {
    console.error('ERRO: Nao foi possivel extrair SITE_URL de src/lib/site.ts');
    process.exit(1);
  }
  const SITE_URL = siteUrlMatch[1];

  const urlsMatches = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  const locs = [];

  for (const urlBlock of urlsMatches) {
    const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
    if (!locMatch) {
      console.error('ERRO: Bloco <url> sem <loc>.');
      process.exit(1);
    }
    const loc = locMatch[1];
    
    if (loc !== SITE_URL && (!loc.startsWith(SITE_URL + '/') || !loc.endsWith('/'))) {
      console.error(`ERRO: URL deve ser SITE_URL exata ou iniciar com SITE_URL/ e terminar com /: ${loc}`);
      process.exit(1);
    }

    if (locs.includes(loc)) {
      console.error(`ERRO: URL duplicada: ${loc}`);
      process.exit(1);
    }
    locs.push(loc);

    let urlPath = loc.replace(SITE_URL, '');
    if (urlPath === '') urlPath = '/';

    const lastmodMatch = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/);
    
    // As páginas não-artigo não devem ter lastmod (exceto /conteudo/ que é um caso especial mas o teste pediu sem lastmod em home e paginas legais, vamos ver)
    // "sem lastmod em home e páginas legais"
    const isLegalOrHome = urlPath === '/' || urlPath === '/privacidade/' || urlPath === '/termos/' || urlPath === '/reembolso/';
    if (isLegalOrHome && lastmodMatch) {
      console.error(`ERRO: lastmod não deve existir em home e páginas legais: ${loc}`);
      process.exit(1);
    }

    if (lastmodMatch) {
      const lastmod = lastmodMatch[1];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
        console.error(`ERRO: lastmod inválido: ${lastmod}`);
        process.exit(1);
      }
      
      if (urlPath.startsWith('/conteudo/') && urlPath !== '/conteudo/') {
        const slug = urlPath.replace('/conteudo/', '').replace('/', '');
        const mdPath = path.join('content', 'artigos', `${slug}.md`);
        if (fs.existsSync(mdPath)) {
          const mdText = fs.readFileSync(mdPath, 'utf8');
          const updatedMatch = mdText.match(/^updated:\s*["']?([\d-]+)["']?/m);
          const dateMatch = mdText.match(/^date:\s*["']?([\d-]+)["']?/m);
          const expectedDate = updatedMatch ? updatedMatch[1] : (dateMatch ? dateMatch[1] : null);
          if (expectedDate && lastmod !== expectedDate) {
            console.error(`ERRO: lastmod divergente para ${slug}. Esperado ${expectedDate}, encontrado ${lastmod}`);
            process.exit(1);
          }
        }
      }
    }
    
    let sysPath;
    if (urlPath === '/') {
      sysPath = path.join('out', 'index.html');
    } else {
      sysPath = path.join('out', urlPath, 'index.html');
      if (!fs.existsSync(sysPath)) {
        sysPath = path.join('out', urlPath.replace(/\/$/, '.html'));
      }
    }
    
    if (!fs.existsSync(sysPath)) {
      console.error(`ERRO: Rota no sitemap não encontrada no out/: ${loc}`);
      process.exit(1);
    }
  }

  console.log('Verificação de sitemap passou com sucesso.');
}

checkSitemap();
