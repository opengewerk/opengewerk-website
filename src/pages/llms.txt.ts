// llms.txt, the short map of the site for language models: what the project
// is, which pages there are and what each one answers. Built from site.ts
// rather than kept as a file in public, so a renamed or added page shows up
// here without anyone remembering to copy it over.
//
// It carries no statement about the state of the software. That changes with
// every release and has its place on the pages this file points to.
import type { APIRoute } from 'astro';
import { LINKS, NAVIGATION, SITE } from '../site';

const absolute = (path: string) => new URL(path, SITE.url).href;

const entry = (label: string, href: string, note: string) => `- [${label}](${href}): ${note}`;

const lines = [
  `# ${SITE.name}`,
  '',
  `> ${SITE.description}`,
  '',
  'OpenGewerk ist ein Open-Source-Projekt und kein gehosteter Dienst. Die Software läuft über Docker auf einem Server, den der Betrieb selbst stellt oder mietet, kostet keine Lizenzgebühren und hält alle Daten dort. Was gebaut ist und was noch fehlt, steht auf den Seiten Funktionen und Stand. Die Seiten sind auf Deutsch.',
  '',
  '## Seiten',
  '',
  ...NAVIGATION.map((page) => entry(page.label, absolute(page.href), page.hint)),
  '',
  '## Projekt',
  '',
  entry('Quelltext', LINKS.repository, 'Das Repository der Anwendung auf GitHub, unter der AGPL-3.0.'),
  entry('Feature-Gliederung', LINKS.concept, 'Das Konzept mit allen Bereichen und dem Fahrplan.'),
  entry('Architekturentscheidungen', LINKS.decisions, 'Die Entscheidungen zur Architektur, je eine Datei.'),
  entry('Docker Hub', LINKS.dockerHub, 'Die veröffentlichten Abbilder der Anwendung.'),
  entry('Kanzlei-Hub', LINKS.kanzlei, 'Der getrennte Hub, über den ein Steuerberater angebunden wird.'),
  entry('API-Vertrag', LINKS.apiSpec, 'Der Schnittstellenvertrag zwischen Anwendung und Kanzlei-Hub, unter Apache-2.0.'),
  '',
  '## Optional',
  '',
  entry('Discussions', LINKS.discussions, 'Fragen und fachliche Rückmeldung zum Projekt.'),
  entry('Impressum', absolute('/impressum/'), 'Anbieter und Kontakt.'),
  entry('Datenschutz', absolute('/datenschutz/'), 'Was die Website an Daten verarbeitet.'),
];

export const GET: APIRoute = () =>
  new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
