import React, { useEffect } from 'react';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, toAbsoluteUrl } from '../../seo/seoConfig';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

/**
 * Manages per-route document title, meta description, canonical link,
 * Open Graph / Twitter cards, and Schema.org JSON-LD scripts cleanly without external deps.
 */
export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  path,
  keywords,
  image,
  type = 'website',
  noIndex = false,
  jsonLd,
}) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = normalizedPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`;
  const absoluteImage = image ? toAbsoluteUrl(image) : DEFAULT_OG_IMAGE;
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    if (keywords) {
      upsertMeta('name', 'keywords', keywords);
    }

    const robotsValue = noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    upsertMeta('name', 'robots', robotsValue);
    upsertMeta('name', 'googlebot', robotsValue);

    upsertCanonical(canonicalUrl);

    // Open Graph
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', absoluteImage);

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absoluteImage);

    // Structured Data (JSON-LD)
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld="true"]');
    existingScripts.forEach((node) => node.remove());

    if (serializedJsonLd) {
      const payloads = JSON.parse(serializedJsonLd);
      const list = Array.isArray(payloads) ? payloads : [payloads];
      list.forEach((schemaObj) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', 'true');
        script.textContent = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }
  }, [title, description, keywords, canonicalUrl, absoluteImage, type, noIndex, serializedJsonLd]);

  return null;
};
