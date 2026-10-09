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
  'OpenGewerk ist ein Open-Source-Projekt und kein gehosteter Dienst. Es baut zwei Anwendungen auf einem gemeinsamen Fundament: die Handwerkersoftware für Elektro- und PV-Betriebe und OpenGewerk Haustechnik für Organisationen, die Gebäude mit eigener Haustechnik betreiben. Beide laufen über Docker auf einem Server, den der Betrieb oder Betreiber selbst stellt oder mietet, kosten keine Lizenzgebühren und halten alle Daten dort. Was gebaut ist und was noch fehlt, steht für die Handwerkersoftware auf den Seiten Handwerk und Stand, für die Haustechnik auf ihrer Seite und deren Stand. Die Seiten sind auf Deutsch.',
  '',
  '## Seiten',
  '',
  ...NAVIGATION.map((page) => entry(page.label, absolute(page.href), page.hint)),
  entry(
    'Stand der Haustechnik',
    absolute('/haustechnik/stand/'),
    'Was in OpenGewerk Haustechnik gebaut ist und die Phasen bis zum Vollausbau.',
  ),
  '',
  '## Projekt',
  '',
  entry('Quelltext der Handwerkersoftware', LINKS.repository, 'Das Repository der Handwerkersoftware auf GitHub, unter der AGPL-3.0. Es enthält auch das gemeinsame Fundament.'),
  entry('Quelltext der Haustechnik', LINKS.haustechnik, 'Das Repository von OpenGewerk Haustechnik auf GitHub, unter der AGPL-3.0, mit den Pflichtenpaketen als Daten.'),
  entry('Feature-Gliederung', LINKS.concept, 'Das Konzept der Handwerkersoftware mit allen Bereichen und dem Fahrplan.'),
  entry('Planungskonzept der Haustechnik', LINKS.haustechnikConcept, 'Das Konzept von OpenGewerk Haustechnik mit allen Bereichen und dem Fahrplan.'),
  entry('Architekturentscheidungen', LINKS.decisions, 'Die Entscheidungen zur Architektur, je eine Datei.'),
  entry('Docker Hub', LINKS.dockerHub, 'Die veröffentlichten Abbilder der Handwerkersoftware.'),
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
