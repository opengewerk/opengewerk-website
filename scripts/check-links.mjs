// Walks the built site and checks that every internal link points at something
// that was actually built. A typo in an href costs a visitor a 404 and costs
// the site a link that search engines follow into nothing, and neither shows up
// in a build log. Runs against dist, so it sees the real output and not the
// source.
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath rather than url.pathname: the path of this checkout contains a
// space, and pathname hands it back percent encoded.
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

async function htmlFiles(directory) {
  const found = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const full = join(directory, item.name);
    if (item.isDirectory()) found.push(...(await htmlFiles(full)));
    else if (item.name.endsWith('.html')) found.push(full);
  }
  return found;
}

// Anything that leaves the site, or that the browser resolves on its own.
const external = (href) =>
  /^(https?:|mailto:|tel:|#|data:)/.test(href) || href.startsWith('//');

function targetOf(href) {
  const path = href.split('#')[0].split('?')[0];
  if (path === '' || path === '/') return 'index.html';
  const clean = path.replace(/^\//, '');
  // A directory URL is served as its index.html, anything with a suffix is a
  // file in its own right.
  return posix.extname(clean) ? clean : posix.join(clean, 'index.html');
}

const pages = await htmlFiles(DIST);
const problems = [];
let checked = 0;

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (external(href)) continue;
    checked += 1;
    if (!existsSync(join(DIST, targetOf(href)))) {
      problems.push(`${page.slice(DIST.length)}: ${href}`);
    }
  }
}

if (problems.length > 0) {
  console.error('Interne Verweise, die ins Leere führen:');
  for (const line of problems) console.error(`  ${line}`);
  process.exit(1);
}

console.log(`${checked} interne Verweise auf ${pages.length} Seiten geprüft, alle vorhanden.`);
