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
  
  walk('out', (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('TODO_DADO')) {
      console.error(`ERRO: Marcador TODO_DADO esquecido em ${filePath}`);
      found = true;
    }
  });

  if (found) {
    console.error('\nBuild reprovado. Preencha os dados institucionais.');
    process.exit(1);
  }
  
  console.log('Sucesso: Nenhum TODO_DADO encontrado no build de produção.');
} catch (e) {
  console.error('Erro fatal ao verificar a pasta out/:', e);
  process.exit(1);
}
