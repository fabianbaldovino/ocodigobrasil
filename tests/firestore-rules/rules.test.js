import { describe, it, before, after, beforeEach } from 'node:test';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { doc, setDoc, getDoc, getDocs, collection, serverTimestamp, deleteDoc } from 'firebase/firestore';

let testEnv;

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "demo-ocodigobrasil",
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

after(async () => {
  await testEnv.cleanup();
});

describe('Firestore Rules - Comments', () => {
  const slug = 'como-a-rua-destroi-suas-vendas';

  it('a) comentário válido (pending): PASSA; com campo extra: NEGADO; leitura de pending: NEGADA; de approved: PASSA', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    await assertSucceeds(
      setDoc(doc(db, 'comments', 'c1'), { slug, name: 'Fulano', text: 'Excelente', status: 'pending', createdAt: serverTimestamp() })
    );

    await assertFails(
      setDoc(doc(db, 'comments', 'c2'), { slug, name: 'Fulano', text: 'Excelente', status: 'pending', extra: 'hacked', createdAt: serverTimestamp() })
    );

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, 'comments', 'c-approved'), { status: 'approved' });
    });

    await assertFails(getDoc(doc(db, 'comments', 'c1')));
    await assertSucceeds(getDoc(doc(db, 'comments', 'c-approved')));
  });

  it('b) artigo novo, fora de qualquer lista: PASSA (slug validado pelo formato)', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertSucceeds(
      setDoc(doc(db, 'comments', 'c-novo'), { slug: 'o-que-a-festa-significa-para-o-brasileiro', name: 'Fulano', text: 'Ótimo', status: 'pending', createdAt: serverTimestamp() })
    );
  });

  it('c) slug com formato inválido: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    for (const bad of ['Maiusculo', 'com espaco', '../x', '-inicio', 'fim-', 'a'.repeat(101)]) {
      await assertFails(
        setDoc(doc(db, 'comments', `c-${bad.length}`), { slug: bad, name: 'Fulano', text: 'Ótimo', status: 'pending', createdAt: serverTimestamp() })
      );
    }
  });

  it('d) status diferente de pending, nome ou texto curtos/longos: NEGADOS', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(setDoc(doc(db, 'comments', 'd1'), { slug, name: 'Fulano', text: 'Ótimo', status: 'approved', createdAt: serverTimestamp() }));
    await assertFails(setDoc(doc(db, 'comments', 'd2'), { slug, name: 'F', text: 'Ótimo', status: 'pending', createdAt: serverTimestamp() }));
    await assertFails(setDoc(doc(db, 'comments', 'd3'), { slug, name: 'Fulano', text: 'x'.repeat(1001), status: 'pending', createdAt: serverTimestamp() }));
  });

  it('e) update e delete de comentário: NEGADOS', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'comments', 'c-approved'), { slug, name: 'Fulano', text: 'Ótimo', status: 'approved' });
    });
    await assertFails(setDoc(doc(db, 'comments', 'c-approved'), { slug, name: 'Outro', text: 'Mudou', status: 'pending', createdAt: serverTimestamp() }));
    await assertFails(deleteDoc(doc(db, 'comments', 'c-approved')));
  });
});

describe('Firestore Rules - Estrelas removidas', () => {
  const slug = 'como-a-rua-destroi-suas-vendas';

  it('f) leitura e escrita na antiga coleção ratings e em votes: NEGADAS', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, 'ratings', slug)));
    await assertFails(getDocs(collection(db, 'ratings', slug, 'votes')));
    await assertFails(setDoc(doc(db, 'ratings', slug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: 'dev-123456' }));
    await assertFails(setDoc(doc(db, 'ratings', slug, 'votes', 'dev-123456'), { score: 5, updatedAt: serverTimestamp() }));
    await assertFails(deleteDoc(doc(db, 'ratings', slug)));
  });
});
