// One place for everything that appears in more than one file: the name, the
// canonical host, the navigation and the outbound links. A second copy of any
// of these is a copy that drifts.

export const SITE = {
  name: 'OpenGewerk',
  url: 'https://opengewerk.de',
  tagline: 'Self-hosted Handwerkersoftware für Elektro und PV',
  /** Falls back as the Open Graph image wherever a page brings none. */
  socialImage: '/marke/social.png',
} as const;

/** Provider details. Used by the two legal pages, so they cannot drift apart. */
export const PROVIDER = {
  name: 'Moritz Kohm',
  street: 'Hauptstraße 103',
  city: '68535 Edingen-Neckarhausen',
  country: 'Deutschland',
  email: 'info@opengewerk.de',
  vatId: 'DE364543992',
  // The institution's own name, which does not change with whoever holds the
  // office. Inventing a gendered form here would be a guess.
  supervisoryAuthority:
    'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg',
  /** The rented machine this site runs on. A processor under Art. 28 GDPR. */
  hoster: 'netcup GmbH, Daimlerstraße 25, 76185 Karlsruhe',
  /** How long the web server keeps its log files. */
  logRetention: '14 Tagen',
  /** Shown at the foot of both legal pages. */
  legalAsOf: 'September 2026',
} as const;

export const LINKS = {
  github: 'https://github.com/opengewerk',
  repository: 'https://github.com/opengewerk/opengewerk',
  discussions: 'https://github.com/opengewerk/opengewerk/discussions',
  issues: 'https://github.com/opengewerk/opengewerk/issues/new/choose',
  discord: 'https://discord.gg/NRrEvbQdxz',
  concept:
    'https://github.com/opengewerk/opengewerk/blob/main/docs/konzept/Feature-Gliederung.md',
  decisions: 'https://github.com/opengewerk/opengewerk/tree/main/docs/adr',
  contributing:
    'https://github.com/opengewerk/.github/blob/main/CONTRIBUTING.md',
  license: 'https://github.com/opengewerk/opengewerk/blob/main/LICENSE',
  kanzlei: 'https://github.com/opengewerk/opengewerk-kanzlei',
  apiSpec: 'https://github.com/opengewerk/opengewerk-api-spec',
} as const;

// The hint is what a page is about in one line. The navigation has no room for
// it, the page that catches a wrong address has nothing but room.
export const NAVIGATION = [
  {
    href: '/funktionen/',
    label: 'Funktionen',
    hint: 'Was gebaut ist, was teilweise steht und was noch fehlt.',
  },
  {
    href: '/elektro-und-pv/',
    label: 'Elektro und PV',
    hint: 'Anlage bis zum Stromkreis, Prüfprotokolle, Messgeräte-Import.',
  },
  {
    href: '/buchhaltung/',
    label: 'Buchhaltung',
    hint: 'Eigenes Journal statt Exportknopf, GoBD, E-Rechnung.',
  },
  {
    href: '/self-hosting/',
    label: 'Selbst hosten',
    hint: 'Start über Docker, Sicherung, Update, Datenschutz.',
  },
  {
    href: '/alternativen/',
    label: 'Vergleich',
    hint: 'Gegenüber openHandwerk, plancraft, sevdesk und Odoo.',
  },
  {
    href: '/roadmap/',
    label: 'Stand',
    hint: 'Die sechs Phasen und wo das Projekt gerade steht.',
  },
  {
    href: '/mitmachen/',
    label: 'Mitmachen',
    hint: 'Wobei gerade konkret geholfen werden kann.',
  },
] as const;
