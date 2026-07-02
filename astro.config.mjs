import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import { buildBlogLastmodMap } from './scripts/sitemap-dates.mjs';

const site = 'https://popmyvideo.com';
const blogLastmod = buildBlogLastmodMap(site);

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/email-confirmed') && !page.includes('/reset-password') && !page.includes('/404'),
      serialize(item) {
        const { pathname } = new URL(item.url);
        const blogDate = blogLastmod.get(pathname) ?? blogLastmod.get(item.url);

        if (blogDate) {
          return { ...item, lastmod: blogDate, changefreq: 'monthly', priority: 0.8 };
        }
        if (pathname === '/') {
          return { ...item, lastmod: new Date(), changefreq: 'weekly', priority: 1 };
        }
        if (pathname === '/blog/') {
          return { ...item, lastmod: new Date(), changefreq: 'weekly', priority: 0.9 };
        }
        return { ...item, changefreq: 'monthly', priority: 0.5 };
      },
    }),
    tailwind(),
  ],
});