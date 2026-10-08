import fs from 'fs';
import path from 'path';

function checkDir(dir) {
  let count = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) count += checkDir(full);
    else if (full.endsWith('.html') || full.endsWith('.js') || full.endsWith('.txt')) {
      const text = fs.readFileSync(full, 'utf8');
      if (text.includes('EXEMPLO (somente prévia)')) count++;
    }
  }
  return count;
}

const c = checkDir('out');
if (c > 0) {
  console.log(`[ERRO] Foram encontradas ${c} ocorrências de dados de EXEMPLO no build.`);
  process.exit(1);
} else {
  console.log('Verificação de EXEMPLO passou (0 ocorrências).');
  process.exit(0);
}
