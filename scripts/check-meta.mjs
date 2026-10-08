import fs from "node:fs";
import path from "node:path";

let siteUrl = "";
try {
  const siteTs = fs.readFileSync("src/lib/site.ts", "utf8");
  const match = siteTs.match(/export\s+const\s+SITE_URL\s*=\s*['"]([^'"]+)['"]/);
  if (match) {
    siteUrl = match[1];
  } else {
    console.error("ERRO FATAL: SITE_URL não encontrado em src/lib/site.ts");
    process.exit(1);
  }
} catch (e) {
  console.error("ERRO FATAL ao ler src/lib/site.ts:", e);
  process.exit(1);
}

const decodeHTMLEntities = (text) => {
  if (!text) return text;
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
};

const errors = [];
const warnings = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".html")) {
      checkHtml(fullPath);
    }
  }
}

function checkHtml(file) {
  const content = fs.readFileSync(file, "utf8");
  
  const getTag = (regex) => {
    const match = content.match(regex);
    return match ? decodeHTMLEntities(match[1]) : null;
  };

  const title = getTag(/<title[^>]*>([^<]+)<\/title>/);
  const desc = getTag(/<meta\s+name="description"\s+content="([^"]+)"/);
  const canonical = getTag(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  const ogTitle = getTag(/<meta\s+property="og:title"\s+content="([^"]+)"/);
  const ogDesc = getTag(/<meta\s+property="og:description"\s+content="([^"]+)"/);
  const ogImage = getTag(/<meta\s+property="og:image"\s+content="([^"]+)"/);
  const h1Matches = content.match(/<h1[^>]*>/g) || [];

  const is404 = file.includes("404") || file.includes("not-found");

  if (!title) {
    errors.push(`${file}: Faltando <title>`);
  } else {
    if (title.length > 60) errors.push(`${file}: Title > 60 chars (${title.length})`);
    if (title.includes("O Código Brasil | O Código Brasil")) errors.push(`${file}: Marca duplicada no Title`);
  }

  if (h1Matches.length !== 1) {
    errors.push(`${file}: Possui ${h1Matches.length} tags <H1>. (Requerido: 1)`);
  }

  if (!is404) {
    if (!desc) {
      errors.push(`${file}: Faltando meta description`);
    } else {
      if (desc.length > 155) errors.push(`${file}: Description > 155 chars (${desc.length})`);
      if (desc.length < 110) warnings.push(`${file}: [AVISO] Description < 110 chars (${desc.length})`);
    }

    if (!canonical) {
      errors.push(`${file}: Faltando canonical`);
    } else if (!canonical.startsWith(siteUrl)) {
      errors.push(`${file}: Canonical fora do SITE_URL (${canonical})`);
    }

    if (!ogImage) {
      errors.push(`${file}: Faltando og:image`);
    }
  }

  if (ogImage && !ogImage.startsWith("http")) {
    errors.push(`${file}: og:image sem URL absoluta (${ogImage})`);
  }

  if (ogTitle && ogTitle !== title) {
    errors.push(`${file}: og:title difere do <title>`);
  }

  if (ogDesc && desc && ogDesc !== desc) {
    errors.push(`${file}: og:description difere da meta description`);
  }
}

walk("out");

if (warnings.length > 0) {
  console.log("Avisos SEO:");
  warnings.forEach(w => console.log(" -", w));
}

if (errors.length > 0) {
  console.error("ERROS de SEO detectados (" + errors.length + "):");
  const showErrors = errors.length > 10 ? [...errors.slice(0, 5), "...", ...errors.slice(-5)] : errors;
  showErrors.forEach(e => console.error(" -", e));
  process.exit(1);
} else {
  console.log("Validacao SEO em todos os artefatos estaticos aprovada.");
}
