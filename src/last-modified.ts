// When a page was last changed, read from the history of its source file. The
// date goes into the structured data and into the sitemap, and both are only
// worth having if they are true: a build date would claim a change on every
// page with every deploy, and a search engine that catches a sitemap doing that
// stops trusting its dates.
//
// A changed layout or a changed entry in site.ts does not move the date of a
// page. That is deliberate. What a reader would call a change of the page is a
// change of its text, and that lives in its own file.
import { execFileSync } from 'node:child_process';

// The working directory rather than import.meta.url: during a build this module
// runs from a bundled chunk inside dist, and a path relative to that points
// nowhere. Every script in package.json runs from the root of the repository.
const ROOT = process.cwd();

function git(...args: string[]): string | undefined {
  try {
    return execFileSync('git', args, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    // No git at hand or not a checkout, as in a source archive.
    return undefined;
  }
}

// A shallow clone knows a single commit and reports its date for every file.
// That is not a missing answer, it is a wrong one, so the date is left out
// instead. The workflows fetch the full history for exactly this reason.
const usable = git('rev-parse', '--is-shallow-repository') === 'false';

const cache = new Map<string, string | undefined>();

/** The source file a route is built from, relative to the repository root. */
export function pageSource(pathname: string): string {
  const route = pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
  return `src/pages/${route === '' ? 'index' : route}.astro`;
}

/** ISO 8601 date of the last commit that touched the page, if there is one. */
export function lastModified(pathname: string): string | undefined {
  if (!usable) return undefined;

  const source = pageSource(pathname);
  if (!cache.has(source)) {
    cache.set(source, git('log', '-1', '--format=%cI', '--', source) || undefined);
  }
  return cache.get(source);
}
