import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toIsoDateString } from '../lib/dates';

const staticRoutes = [
  '',
  'about',
  'generator',
  'hall-of-fame',
  'guia-keystatic',
  'submit-post',
];

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL('http://localhost:4321');
  const base = new URL(import.meta.env.BASE_URL, origin);
  const toUrl = (path = '') => new URL(path, base).href;

  const posts = await getCollection('blog');
  const categories = [...new Set(posts.map((p) => p.data.category.toLowerCase().replace(/\s+/g, '-')))];
  const tags = [...new Set(posts.flatMap((p) => p.data.tags.map((t) => t.toLowerCase())))];
  const authors = [...new Set(posts.map((p) => (p.data.author || 'anonymous').toLowerCase().replace(/\s+/g, '-')))];

  const urls = [
    ...staticRoutes.map((route) => ({ loc: toUrl(route), lastmod: undefined as string | undefined })),
    ...posts.map((post) => ({ loc: toUrl(`posts/${post.slug}`), lastmod: toIsoDateString(post.data.date) })),
    ...categories.map((slug) => ({ loc: toUrl(`category/${slug}`), lastmod: undefined as string | undefined })),
    ...tags.map((tag) => ({ loc: toUrl(`tags/${tag}`), lastmod: undefined as string | undefined })),
    ...authors.map((author) => ({ loc: toUrl(`author/${author}`), lastmod: undefined as string | undefined })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(({ loc, lastmod }) => `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    `\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
