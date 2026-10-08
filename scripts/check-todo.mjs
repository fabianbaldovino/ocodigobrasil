import fs from 'fs';
import path from 'path';

function checkDir(dir) {
  let count = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) count += checkDir(full);
    else if (full.endsWith('.html')) {
      const text = fs.readFileSync(full, 'utf8');
      const matches = text.match(/TODO_DADO/g);
      if (matches) count += matches.length;
    }
  }
  return count;
}

const c = checkDir('out');
console.log('Ocorrencias de TODO_DADO em out/:', c);
process.exit(0);
