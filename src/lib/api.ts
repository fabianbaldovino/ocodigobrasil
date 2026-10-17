import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export type PostComment = {
  id: string;
  name: string;
  text: string;
  createdAt: string | null;
};

const SLUG_RE = /^[a-z0-9-]+$/;

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
