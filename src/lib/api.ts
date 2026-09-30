export type Rating = { avg: number; count: number };

export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function apiPost<T>(
  path: string,
  body: unknown
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) return { data: null, error: json.error || 'tente novamente' };
    return { data: json as T, error: null };
  } catch {
    return { data: null, error: 'sem conexão com o servidor' };
  }
}
