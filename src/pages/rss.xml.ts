import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sortByPostDateDesc, toIsoDateString } from '../lib/dates';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL('http://localhost:4321');
  const base = new URL(import.meta.env.BASE_URL, origin);
  const toUrl = (path = '') => new URL(path, base).href;

  const posts = sortByPostDateDesc(await getCollection('blog')).slice(0, 30);

  const items = posts
    .map((post) => {
      const link = toUrl(`posts/${post.slug}`);
      const title = escapeXml(post.data.title);
      const description = escapeXml(post.data.summary);
      const pubDate = new Date(toIsoDateString(post.data.date)).toUTCString();

      return [
        '<item>',
        `<title>${title}</title>`,
        `<link>${link}</link>`,
        `<guid>${link}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<description>${description}</description>`,
        '</item>',
      ].join('');
    })
    .join('');

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    '<title>HACKER_LOG</title>',
    `<link>${toUrl('')}</link>`,
    '<description>Feed de inteligencia y ciberseguridad</description>',
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900',
    },
  });
};
