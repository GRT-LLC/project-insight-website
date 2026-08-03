import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { canonicalUrl, resolveRouteMeta } from './routeMeta';

/** Every key this module writes. A closed union rather than `string` so the
 *  attribute selector below cannot be handed a quote or bracket: a bad key is
 *  a type error, not a malformed selector at runtime. (PR #31 review, nit 2.) */
type MetaKey =
  | 'description'
  | 'og:title'
  | 'og:description'
  | 'og:url'
  | 'twitter:title'
  | 'twitter:description';

// Upsert a <meta> tag by name or property, creating it if index.html did not
// already ship one. Existing tags (the home defaults) are updated in place.
function upsertMeta(attr: 'name' | 'property', key: MetaKey, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Keeps the document head in sync with the current route: title, description,
 *  canonical, and the og/twitter title/description/url.
 *
 *  Deliberately NOT written here: `twitter:card`, `og:image`, `og:type` and
 *  `og:site_name`. Their values are the same on every route, so they ship once
 *  in index.html and are never touched. Rewriting a constant on each navigation
 *  would only imply it varies. `npm run lint:social-meta` fails the build if any
 *  of them goes missing from index.html, which is the case this hook would
 *  otherwise have to defend against. (PR #31 review.)
 *
 *  Call once from the layout that wraps every page. */
export function useRouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = resolveRouteMeta(pathname);
    const url = canonicalUrl(pathname);

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertCanonical(url);

    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', url);

    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
  }, [pathname]);
}
