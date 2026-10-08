import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const SITE_URL = fs
  .readFileSync(path.join('src', 'lib', 'site.ts'), 'utf8')
  .match(/export const SITE_URL = ["']([^"']+)["']/)[1];

const home = path.join('out', 'index.html');
const article = path.join('out', 'conteudo', 'o-case-havaianas', 'index.html');

const ldRe = /<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi;

const cases = [
  {
    name: 'price injetado na home',
    file: home,
    mutate: (h) => h.replace('"jobTitle":"Brand Filmmaker"', '"jobTitle":"Brand Filmmaker","price":"10"'),
    expect: 'Chave price nao permitida',
  },
  {
    name: '@type Offer injetado na home',
    file: home,
    mutate: (h) => h.replace('"jobTitle":"Brand Filmmaker"', '"jobTitle":"Brand Filmmaker","x":{"@type":"Offer"}'),
    expect: '@type Offer nao permitido',
  },
  {
    name: 'JSON-LD ausente na home',
    file: home,
    mutate: (h) => h.replace(ldRe, ''),
    expect: 'JSON-LD ausente',
  },
  {
    name: 'JSON-LD ausente em artigo',
    file: article,
    mutate: (h) => h.replace(ldRe, ''),
    expect: 'JSON-LD ausente',
  },
  {
    name: 'URL com sufixo (SITE_URL + "evil")',
    file: home,
    mutate: (h) => h.replace(`"url":"${SITE_URL}"`, `"url":"${SITE_URL}evil"`),
    expect: 'URL invalida',
  },
  {
    name: '"<" literal dentro do JSON-LD',
    file: home,
    mutate: (h) => h.replace('"jobTitle":"Brand Filmmaker"', '"jobTitle":"Brand <b>Filmmaker"'),
    expect: '"<" literal',
  },
];

let failed = 0;
for (const c of cases) {
  const original = fs.readFileSync(c.file, 'utf8');
  const mutated = c.mutate(original);
  if (mutated === original) {
    console.log(`FALHA [${c.name}]: mutacao nao alterou o arquivo (teste invalido).`);
    failed++;
    continue;
  }
  try {
    fs.writeFileSync(c.file, mutated, 'utf8');
    const r = spawnSync('node', [path.join('scripts', 'check-jsonld.mjs')], { encoding: 'utf8' });
    const out = (r.stdout || '') + (r.stderr || '');
    const ok = r.status !== 0 && out.includes(c.expect);
    console.log(`${ok ? 'OK   ' : 'FALHA'} [${c.name}] exit=${r.status} esperado="${c.expect}"`);
    if (!ok) {
      console.log(out);
      failed++;
    }
  } finally {
    fs.writeFileSync(c.file, original, 'utf8');
  }
}

const base = spawnSync('node', [path.join('scripts', 'check-jsonld.mjs')], { encoding: 'utf8' });
console.log(`baseline apos restauracao: exit=${base.status}`);
if (base.status !== 0) failed++;
process.exit(failed ? 1 : 0);
