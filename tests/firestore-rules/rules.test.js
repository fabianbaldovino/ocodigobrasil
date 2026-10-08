import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { runTransaction, doc, setDoc, getDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

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
  it('1. primeiro voto de dispositivo novo em artigo válido: PASSA', async () => {
    const unauthed = testEnv.unauthenticatedContext();
    const db = unauthed.firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev-1234567890';
    
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        const [voteSnap, ratingSnap] = await Promise.all([tx.get(voteRef), tx.get(ratingRef)]);
        
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('2. re-voto com nota diferente: PASSA, com sum e count corretos', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev-1234567890';
    
    // Voto inicial
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
    
    // Re-voto
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        const voteSnap = await tx.get(voteRef);
        const ratingSnap = await tx.get(ratingRef);
        
        const prev = voteSnap.data().score;
        const d = ratingSnap.data();
        const score = 3;
        
        const count = d.count; // mesmo device = n muda
        const sum = d.sum - prev + score;
        const avg = sum / count;
        
        tx.set(voteRef, { score, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count, sum, avg, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
    
    // Checar sum e count corretos usando rules-unit-testing context para read (read is public)
    const ratingDoc = await getDoc(doc(db, 'ratings', slug));
    assert.strictEqual(ratingDoc.data().count, 1);
    assert.strictEqual(ratingDoc.data().sum, 3);
  });

  it('3. re-voto com a mesma nota: PASSA', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev-same-note';
    
    // Voto inicial
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 4, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count: 1, sum: 4, avg: 4, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
    
    // Re-voto com mesma nota
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 4, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count: 1, sum: 4, avg: 4, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('4. update direto de ratings sem voto: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev-update-direto';
    
    // Setup inicial
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, 'ratings', slug, 'votes', deviceId), { score: 5, updatedAt: serverTimestamp() });
      await setDoc(doc(adminDb, 'ratings', slug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId });
    });

    // Update tentando inflar sum sem voto real
    await assertFails(
      setDoc(doc(db, 'ratings', slug), { count: 1, sum: 10, avg: 10, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true })
    );
  });

  it('5. create de ratings sem voto: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    await assertFails(
      setDoc(doc(db, 'ratings', slug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: 'fake-device' })
    );
  });

  it('6. count-1 para zerar: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev-minus';
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, 'ratings', slug, 'votes', deviceId), { score: 5, updatedAt: serverTimestamp() });
      await setDoc(doc(adminDb, 'ratings', slug), { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId });
    });

    // Tentativa de update que zera o count
    await assertFails(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count: 0, sum: 0, avg: 0, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('7. avg incoerente com sum/count: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev-avg-incoerente';
    
    await assertFails(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        // count = 1, sum = 5, avg = 4.8 (diferença maior que 0.01)
        tx.set(ratingRef, { count: 1, sum: 5, avg: 4.8, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('8. avg > 5 ou sum > count*5: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev-acima';
    
    await assertFails(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        // A regra impede avg > 5 e sum > count*5. Mas para sum=6 e count=1, a transacao tenta:
        tx.set(ratingRef, { count: 1, sum: 6, avg: 6, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('9. lastVoter com barras ou fora do formato: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev/invalid/id'; // Invalido pelo regex
    
    await assertFails(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('10. lastVoter sem voto: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev-real';
    const fakeDevice = 'dev-fake';
    
    await assertFails(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        // Transacao indica que o ultimo votante foi fakeDevice, mas gravou o voto em deviceId
        tx.set(ratingRef, { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: fakeDevice }, { merge: true });
      })
    );
  });

  it('11. ATAQUE DE DESVIO: gravar votes/D sozinho (sem tocar em ratings): NEGADO, e fluxo normal passa', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';
    const deviceId = 'dev-desvio';
    
    // Tentar gravar apenas em votes isoladamente -> deve falhar devido à regra de acoplamento
    await assertFails(
      setDoc(doc(db, 'ratings', slug, 'votes', deviceId), { score: 5, updatedAt: serverTimestamp() })
    );

    // O fluxo normal logo após deve continuar funcionando
    await assertSucceeds(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('12. slug fora da lista em ratings e em comments: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'slug-invalido-inexistente';
    const deviceId = 'dev-slug-inv';
    
    await assertFails(
      runTransaction(db, async (tx) => {
        const ratingRef = doc(db, 'ratings', slug);
        const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);
        tx.set(voteRef, { score: 5, updatedAt: serverTimestamp() });
        tx.set(ratingRef, { count: 1, sum: 5, avg: 5, updatedAt: serverTimestamp(), lastVoter: deviceId }, { merge: true });
      })
    );
  });

  it('13. comentário válido pending: PASSA; com campo extra: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const slug = 'como-a-rua-destroi-suas-vendas';

    // Comentário válido
    await assertSucceeds(
      setDoc(doc(db, 'comments', 'c1'), {
        slug,
        name: 'Fulano',
        text: 'Excelente',
        status: 'pending',
        createdAt: serverTimestamp()
      })
    );

    // Com campo extra
    await assertFails(
      setDoc(doc(db, 'comments', 'c2'), {
        slug,
        name: 'Fulano',
        text: 'Excelente',
        status: 'pending',
        extra: 'hacked',
        createdAt: serverTimestamp()
      })
    );
  });

  it('14. leitura de comentário pending: NEGADA, de approved: PASSA', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, 'comments', 'c-pending'), { status: 'pending' });
      await setDoc(doc(adminDb, 'comments', 'c-approved'), { status: 'approved' });
    });

    await assertFails(getDoc(doc(db, 'comments', 'c-pending')));
    await assertSucceeds(getDoc(doc(db, 'comments', 'c-approved')));
  });

  it('15. delete em qualquer coleção: NEGADO', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    
    await assertFails(deleteDoc(doc(db, 'ratings', 'como-a-rua-destroi-suas-vendas')));
    await assertFails(deleteDoc(doc(db, 'ratings', 'como-a-rua-destroi-suas-vendas', 'votes', 'dev-123')));
    await assertFails(deleteDoc(doc(db, 'comments', 'c-approved')));
  });

});
