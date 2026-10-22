// Impede publicar o Hosting a partir de uma máquina local.
// O site só vai ao ar pelo GitHub Actions, depois dos checks de lint, tipos,
// build, meta, JSON-LD, sitemap e dados de exemplo. Para uma emergência,
// rode com ALLOW_LOCAL_DEPLOY=1.
if (process.env.GITHUB_ACTIONS === 'true' || process.env.ALLOW_LOCAL_DEPLOY === '1') {
  process.exit(0);
}

console.error(`
[ERRO] Deploy local do Hosting bloqueado.
O site é publicado automaticamente pelo GitHub Actions a cada push na main.
Faça commit e push; o deploy acontece sozinho depois dos checks.
(Para regras do Firestore use: firebase deploy --only firestore:rules)
`);
process.exit(1);
