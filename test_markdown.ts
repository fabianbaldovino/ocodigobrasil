import { getPostData } from './src/lib/markdown';
async function test() {
  const data = await getPostData('mini-dicionario-codigo-brasil');
  const headings = data.contentHtml.match(/<h2 id="[^"]+">/g);
  console.log(headings);
}
test().catch(console.error);
