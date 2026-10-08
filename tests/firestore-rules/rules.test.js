import { describe, it, before, after, beforeEach } from 'node:test';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { runTransaction, doc, setDoc, getDoc, getDocs, collection, serverTimestamp, deleteDoc } from 'firebase/firestore';

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

describe('Firestore Rules - Ratings & Votes', () => {
  const slug = 'como-a-rua-destroi-suas-vendas';

  it('a) primeiro voto de dispositivo novo em artigo válido, sem documento ratings prévio: PASSA', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const deviceId = 'dev-a-123';
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('b) segundo dispositivo vota no mesmo artigo: PASSA, com count 2 e sum correta', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const dev1 = 'dev-b1-123';
    const dev2 = 'dev-b2-123';
    
    // Voto 1
    await runTransaction(db, async (tx) => {
      tx.set(doc(db, 'ratings', slug, 'votes', dev1), { score: 4, updatedAt: serverTimestamp() });
      tx.set(doc(db, 'ratings', slug), { count: 1, sum: 4, avg: 4, updatedAt: serverTimestamp(), lastVoter: dev1 }, { merge: true });
    });
    
    // Voto 2
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', dev2);
        
        const [, ratingSnap] = await Promise.all([tx.get(voteRef), tx.get(ratingRef)]);
        const d = ratingSnap.exists() ? ratingSnap.data() : { count: 0, sum: 0 };
        
        const count = d.count + 1; // prev is 0
        const sum = d.sum + 5;
        const avg = sum / count;
        
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count, sum, avg, updatedAt: serverTimestamp(), lastVoter: dev2 }, { merge: true });
      })
    );
  });

  it('c) re-voto com nota diferente: PASSA, sum e count certos; re-voto com a mesma nota: PASSA', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const deviceId = 'dev-c-123';
    
    // Voto inicial
    await runTransaction(db, async (tx) => {
      tx.set(doc(db, 'ratings', slug, 'votes', deviceId), { score: 3, updatedAt: serverTimestamp() });
      tx.set(doc(db, 'ratings', slug), { count: 1, sum: 3, avg: 3, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
    });

    // Re-voto diferente
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        
        const [voteSnap, ratingSnap] = await Promise.all([tx.get(voteRef), tx.get(ratingRef)]);
        const prev = voteSnap.data().score;
        const d = ratingSnap.data();
        const score = 5;
        const count = d.count;
        const sum = d.sum - prev + score;
        const avg = sum / count;
        
        tx.set(voteRef, { score, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count, sum, avg, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );

    // Re-voto igual
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        
        const [voteSnap, ratingSnap] = await Promise.all([tx.get(voteRef), tx.get(ratingRef)]);
        const prev = voteSnap.data().score;
        const d = ratingSnap.data();
        const score = 5;
        const count = d.count;
        const sum = d.sum - prev + score;
        const avg = sum / count;
        
        tx.set(voteRef, { score, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count, sum, avg, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('d) update direto de ratings sem voto: NEGADO; create de ratings sem voto: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, 'ratings', slug, 'votes', 'dev-d-123'), { score: 5, updatedAt: serverTimestamp() });
      await setDoc(doc(adminDb, 'ratings', slug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: 'dev-d-123' });
    });

    await assertFails(
      setDoc(doc(db, 'ratings', slug), { count: 1, sum: 10, avg: 10, updatedAt: serverTimestamp(), lastVoter: 'dev-d-123' }, { merge: true })
    );

    await assertFails(
      setDoc(doc(db, 'ratings', 'novo-slug-na-lista-que-falha'), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: 'fake-123' })
    );
  });

  it('e) count-1 para zerar, avg incoerente, avg > 5, sum > count*5: NEGADOS', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const deviceId = 'dev-e-123';
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, 'ratings', slug, 'votes', deviceId), { score: 5, updatedAt: serverTimestamp() });
      await setDoc(doc(adminDb, 'ratings', slug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId });
    });

    // count zerar
    await assertFails(
      runTransaction(db, async (tx) => {
        tx.set(doc(db, 'ratings', slug, 'votes', deviceId), { score: 5, updatedAt: serverTimestamp() });
        tx.set(doc(db, 'ratings', slug), { count: 0, sum: 0, avg: 0, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );

    // avg incoerente
    await assertFails(
      runTransaction(db, async (tx) => {
        tx.set(doc(db, 'ratings', slug, 'votes', deviceId), { score: 5, updatedAt: serverTimestamp() });
        tx.set(doc(db, 'ratings', slug), { count: 1, sum: 5, avg: 4.8, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );

    // avg > 5
    await assertFails(
      runTransaction(db, async (tx) => {
        tx.set(doc(db, 'ratings', slug, 'votes', deviceId), { score: 5, updatedAt: serverTimestamp() });
        tx.set(doc(db, 'ratings', slug), { count: 1, sum: 6, avg: 6, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('f) lastVoter com barras ou fora do formato; lastVoter sem voto: NEGADOS', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    
    // formato invalido (@)
    await assertFails(
      runTransaction(db, async (tx) => {
        tx.set(doc(db, 'ratings', slug, 'votes', 'dev@f-123'), { score: 5, updatedAt: serverTimestamp() });
        tx.set(doc(db, 'ratings', slug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: 'dev@f-123' }, { merge: true });
      })
    );

    // sem voto
    await assertFails(
      runTransaction(db, async (tx) => {
        tx.set(doc(db, 'ratings', slug, 'votes', 'dev-real-123'), { score: 5, updatedAt: serverTimestamp() });
        tx.set(doc(db, 'ratings', slug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: 'dev-fake-123' }, { merge: true });
      })
    );
  });

  it('g) ATAQUE DE DESVIO: gravar votes/D sozinho (sem tocar em ratings): NEGADO; depois, o voto normal do mesmo dispositivo continua correto', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const deviceId = 'dev-g-123';
    
    await assertFails(
      setDoc(doc(db, 'ratings', slug, 'votes', deviceId), { score: 5, updatedAt: serverTimestamp() })
    );

    await assertSucceeds(
      runTransaction(db, async (tx) => {
        tx.set(doc(db, 'ratings', slug, 'votes', deviceId), { score: 5, updatedAt: serverTimestamp() });
        tx.set(doc(db, 'ratings', slug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('h) score float (4.5), score 0 ou 6: NEGADOS', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    
    await assertFails(
      runTransaction(db, async (tx) => {
        tx.set(doc(db, 'ratings', slug, 'votes', 'dev-h-123'), { score: 4.5, updatedAt: serverTimestamp() });
        tx.set(doc(db, 'ratings', slug), { count: 1, sum: 4.5, avg: 4.5, updatedAt: serverTimestamp(), lastVoter: 'dev-h-123' }, { merge: true });
      })
    );

    await assertFails(
      runTransaction(db, async (tx) => {
        tx.set(doc(db, 'ratings', slug, 'votes', 'dev-h-123'), { score: 0, updatedAt: serverTimestamp() });
        tx.set(doc(db, 'ratings', slug), { count: 1, sum: 0, avg: 0, updatedAt: serverTimestamp(), lastVoter: 'dev-h-123' }, { merge: true });
      })
    );
  });

  it('i) listagem (query) da coleção ratings/{slug}/votes: NEGADA', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDocs(collection(db, 'ratings', slug, 'votes')));
  });

  it('j) MIGRAÇÃO: com withSecurityRulesDisabled, crie dados no formato antigo (ratings sem lastVoter e com avg arredondado a 1 casa, votes antigos), e depois vote pelo fluxo novo: PASSA', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const oldVoter = 'dev-old-123';
    const newVoter = 'dev-mig-123';

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, 'ratings', slug), { count: 1, sum: 4, avg: 4.0, updatedAt: serverTimestamp() });
      await setDoc(doc(adminDb, 'ratings', slug, 'votes', oldVoter), { score: 4, updatedAt: serverTimestamp() });
    });

    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', newVoter);
        
        const [, ratingSnap] = await Promise.all([tx.get(voteRef), tx.get(ratingRef)]);
        
        const d = ratingSnap.data();
        const score = 5;
        
        const count = d.count + 1;
        const sum = d.sum + 5;
        const avg = sum / count; // 9 / 2 = 4.5
        
        tx.set(voteRef, { score, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count, sum, avg, updatedAt: serverTimestamp(), lastVoter: newVoter }, { merge: true });
      })
    );
  });

  it('k) slug fora da lista em ratings e em comments: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const invalidSlug = 'slug-invalido-inexistente';
    
    await assertFails(
      runTransaction(db, async (tx) => {
        tx.set(doc(db, 'ratings', invalidSlug, 'votes', 'dev-k-123'), { score: 5, updatedAt: serverTimestamp() });
        tx.set(doc(db, 'ratings', invalidSlug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: 'dev-k-123' }, { merge: true });
      })
    );

    await assertFails(
      setDoc(doc(db, 'comments', 'c-inv'), { slug: invalidSlug, name: 'A', text: 'B', status: 'pending', createdAt: serverTimestamp() })
    );
  });

  it('l) comentário válido (pending): PASSA; com campo extra: NEGADO; leitura de pending: NEGADA; de approved: PASSA', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    
    await assertSucceeds(
      setDoc(doc(db, 'comments', 'c1'), { slug, name: 'Fulano', text: 'Excelente', status: 'pending', createdAt: serverTimestamp() })
    );

    await assertFails(
      setDoc(doc(db, 'comments', 'c2'), { slug, name: 'F', text: 'E', status: 'pending', extra: 'hacked', createdAt: serverTimestamp() })
    );

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, 'comments', 'c-approved'), { status: 'approved' });
    });

    await assertFails(getDoc(doc(db, 'comments', 'c1')));
    await assertSucceeds(getDoc(doc(db, 'comments', 'c-approved')));
  });

  it('m) delete em qualquer coleção: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(deleteDoc(doc(db, 'ratings', slug)));
    await assertFails(deleteDoc(doc(db, 'ratings', slug, 'votes', 'dev-123')));
    await assertFails(deleteDoc(doc(db, 'comments', 'c-approved')));
  });

});
