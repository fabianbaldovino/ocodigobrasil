import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

try {
  let found = false;
  const extCounts = {};
  let totalOccurrences = 0;
  
  walk('out', (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(/TODO_DADO/g);
    if (matches) {
      const ext = path.extname(filePath) || 'sem_extensao';
      extCounts[ext] = (extCounts[ext] || 0) + 1;
      totalOccurrences += matches.length;
      found = true;
    }
  });

  if (found) {
    console.error('ERROS TODO_DADO por extensão:');
    for (const [ext, count] of Object.entries(extCounts)) {
      console.error(`  ${ext}: ${count} arquivo(s)`);
    }
    console.error(`Total de ocorrências: ${totalOccurrences}`);
    console.error('\nBuild reprovado. Preencha os dados institucionais.');
    process.exit(1);
  }
  
  console.log('Sucesso: Nenhum TODO_DADO encontrado no build de produção.');
} catch (e) {
  console.error('Erro fatal ao verificar a pasta out/:', e);
  process.exit(1);
}
