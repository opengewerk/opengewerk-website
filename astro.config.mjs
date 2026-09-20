// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Needed for canonical URLs, the sitemap and absolute Open Graph images.
  // Without it the sitemap integration refuses to run.
  site: 'https://opengewerk.de',

  // Apache serves a directory as its index.html. Pages are therefore emitted as
  // <route>/index.html and every internal link carries the trailing slash, so a
  // visitor never walks through a DirectorySlash redirect on the way in.
  trailingSlash: 'always',

  integrations: [
    sitemap({
      // The legal pages carry no search intent and would only dilute the
      // sitemap. They stay reachable and indexable, they are just not announced.
      filter: (page) =>
        !page.endsWith('/impressum/') && !page.endsWith('/datenschutz/'),
    }),
  ],

  image: {
    // The interface previews are wide screenshots. Astro emits avif and webp
    // next to the original and picks per browser.
    responsiveStyles: true,
  },
});
