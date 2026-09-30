import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export type Rating = { avg: number; count: number };

export type PostComment = {
  id: string;
  name: string;
  text: string;
  createdAt: string | null;
};

const SLUG_RE = /^[a-z0-9-]+$/;

export async function fetchRatings(slugs: string[]): Promise<Record<string, Rating>> {
  const valid = slugs.filter((s) => SLUG_RE.test(s)).slice(0, 20);
  const out: Record<string, Rating> = {};
  const snaps = await Promise.all(valid.map((s) => getDoc(doc(db, 'ratings', s))));
  valid.forEach((s, i) => {
    const d = snaps[i].data();
    out[s] = { avg: d?.avg ?? 0, count: d?.count ?? 0 };
  });
  return out;
}

export async function voteRating(slug: string, score: number, deviceId: string): Promise<Rating> {
  if (!SLUG_RE.test(slug)) throw new Error('slug inválido');
  const ratingRef = doc(db, 'ratings', slug);
  const voteRef = doc(db, 'ratings', slug, 'votes', deviceId);

  return runTransaction(db, async (tx) => {
    const [voteSnap, ratingSnap] = await Promise.all([tx.get(voteRef), tx.get(ratingRef)]);
    const prev = voteSnap.exists() ? Number(voteSnap.data()?.score || 0) : 0;
    const d = ratingSnap.exists() ? ratingSnap.data() : { count: 0, sum: 0 };
    const count = (d.count || 0) + (prev === 0 ? 1 : 0);
    const sum = (d.sum || 0) - prev + score;
    const avg = count ? Math.round((sum / count) * 10) / 10 : 0;

    tx.set(voteRef, { score, updatedAt: serverTimestamp() });
    tx.set(ratingRef, { count, sum, avg, updatedAt: serverTimestamp() }, { merge: true });
    return { avg, count };
  });
}

export async function fetchComments(slug: string): Promise<PostComment[]> {
  if (!SLUG_RE.test(slug)) return [];
  const snap = await getDocs(
    query(
      collection(db, 'comments'),
      where('slug', '==', slug),
      where('status', '==', 'approved'),
      limit(50)
    )
  );
  const list: PostComment[] = snap.docs.map((d) => {
    const c = d.data();
    const ts = c.createdAt;
    return {
      id: d.id,
      name: c.name,
      text: c.text,
      createdAt: ts && typeof ts.toDate === 'function' ? ts.toDate().toISOString() : null,
    };
  });
  return list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
}

export async function submitComment(
  slug: string,
  input: { name: string; text: string; website?: string }
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!SLUG_RE.test(slug)) return { ok: false, error: 'artigo inválido' };
  if (input.website && input.website.trim() !== '') return { ok: true };

  const name = input.name.trim().slice(0, 60);
  const text = input.text.trim().slice(0, 1000);
  if (name.length < 2 || text.length < 2) {
    return { ok: false, error: 'preencha nome e comentário' };
  }

  try {
    await addDoc(collection(db, 'comments'), {
      slug,
      name,
      text,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch {
    return { ok: false, error: 'Não foi possível enviar agora.' };
  }
}
