import { useEffect, useState } from 'react';

// Photography, ported from the JarvisTravel app's integration so the two
// properties source imagery the same way. Destination/section photos come from
// the Pexels API (free). When VITE_PEXELS_API_KEY is not set, lookups return
// null and callers fall back to a provided image (or the designed navy band),
// so the site never ships an empty frame or a broken request.

const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY as string | undefined;
const MAX_CACHE = 50;
const cache = new Map<string, string>();

function cacheSet(key: string, value: string) {
  if (cache.size >= MAX_CACHE) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(key, value);
}

export async function fetchImage(query: string): Promise<string | null> {
  const q = query.trim();
  if (!PEXELS_KEY || !q) return null;
  if (cache.has(q)) return cache.get(q)!;
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: PEXELS_KEY } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const url: string | undefined =
      data?.photos?.[0]?.src?.landscape ?? data?.photos?.[0]?.src?.large;
    if (url) cacheSet(q, url);
    return url ?? null;
  } catch {
    return null;
  }
}

/** Returns the fallback until a Pexels photo loads, then the photo. */
export function useImage(query: string, fallback?: string): string | undefined {
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    let cancelled = false;
    fetchImage(query).then((u) => {
      if (!cancelled && u) setUrl(u);
    });
    return () => {
      cancelled = true;
    };
  }, [query]);
  return url ?? fallback;
}

// Both CDNs serve any width via ?w=, so we build a srcSet and let the browser
// pull the right resolution. Non-CDN URLs return undefined (plain src is used).
const CDN_HOSTS = ['images.unsplash.com', 'images.pexels.com'] as const;
const DEFAULT_WIDTHS = [768, 1080, 1440, 2000];

function isCdnImage(url: string): boolean {
  try {
    return (CDN_HOSTS as readonly string[]).includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

function atWidth(url: string, w: number): string {
  try {
    const u = new URL(url);
    u.searchParams.set('w', String(w));
    if (u.hostname === 'images.unsplash.com') {
      u.searchParams.set('q', '80');
      u.searchParams.set('auto', 'format');
    }
    return u.toString();
  } catch {
    return url;
  }
}

export function imageSrcSet(url?: string, widths: number[] = DEFAULT_WIDTHS): string | undefined {
  if (!url || !isCdnImage(url)) return undefined;
  return widths.map((w) => `${atWidth(url, w)} ${w}w`).join(', ');
}
