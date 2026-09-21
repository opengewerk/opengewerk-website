<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/opengewerk/.github/main/brand/opengewerk-logo-dark.svg">
    <img alt="OpenGewerk" src="https://raw.githubusercontent.com/opengewerk/.github/main/brand/opengewerk-logo.svg" width="320">
  </picture>
</p>

<p align="center"><strong>Die Website von OpenGewerk unter opengewerk.de</strong></p>

## Zweck

Bis September 2026 lag unter opengewerk.de eine einzige Datei mit 3,3 kB, die sagte, es gebe noch keinen lauffähigen Code. Das stimmte zu dem Zeitpunkt, an dem sie geschrieben wurde, und zwei Tage später nicht mehr. Dieses Repository löst sie ab: eine statische Seite mit einer Seite je Thema, damit ein Suchender überhaupt etwas findet und ein Betrieb einschätzen kann, ob das Projekt für ihn in Frage kommt.

Die Seite ist bewusst ehrlich über den Stand. Jede Seite nennt, was gebaut ist und was nicht, und die Vergleichsseite nennt auch die Fälle, in denen ein anderes Produkt heute die bessere Wahl ist.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/pages/` | Eine Datei je Route. Die Dateinamen sind deutsch, weil sie die Adresse sind, die ein Besucher liest |
| `src/layouts/Page.astro` | Der einzige Rahmen. Titel, Beschreibung, Canonical, Open Graph und die strukturierten Daten stehen dort und nirgends sonst |
| `src/components/` | Kopf, Fuß und der Rahmen für die Oberflächenbilder |
| `src/site.ts` | Name, Adresse, Navigation, ausgehende Verweise und die Anbieterangaben. Alles, was auf mehr als einer Seite steht |
| `src/styles/global.css` | Ein Stylesheet. Tokens, Layout-Bänder, Bausteine |
| `src/assets/screens/` | Die Oberflächenbilder. Dateinamen deutsch, weil sie aus den Artboards des Entwurfs stammen und sich so zuordnen lassen |
| `public/marke/` | Logo, Icon und Vorschaubild, siehe unten |
| `scripts/check-links.mjs` | Prüft nach dem Bauen, dass kein interner Verweis ins Leere geht |

## Entwickeln

Vorausgesetzt werden Node 24 und ein aktiviertes Corepack. pnpm kommt in der Version, die im Wurzelpaket steht.

```bash
pnpm install
pnpm run dev          # Entwicklungsserver
pnpm run check        # Typen
pnpm run build        # baut nach dist/
pnpm run check:links  # braucht ein gebautes dist/
```

Dieselben Schritte laufen in der CI.

## Konventionen

- **Deutsch ist der Inhalt, Englisch ist der Code.** Bezeichner, Klassennamen, CSS-Tokens und Kommentare sind englisch, Texte, Überschriften und Bildunterschriften deutsch. Die Ausnahme sind die Dateinamen unter `src/pages/`: sie werden zur Adresse und damit zu etwas, das ein Besucher liest.
- **Keine Gedankenstriche**, weder Em-Dash noch En-Dash. Der CI-Job „Schreibweise" prüft das im gesamten Bestand und nicht nur im Diff.
- **Echte Umlaute**, kein `ae`, `oe`, `ue`. Derselbe Job prüft auch das.
- **UTF-8 ohne BOM und LF**, geregelt über `.gitattributes`.
- **Kein Platzhaltertext.** Was noch nicht existiert, wird in einem Satz beschrieben oder weggelassen.

## Responsive

Die Seite trägt von einem 390 px breiten Telefon bis zu einem 3440 px breiten Ultrawide, und zwar über fluide Größen statt einer Treppe aus Breakpoints.

- Schrift, Abstände und die seitliche Gasse rechnen mit `clamp()`. Der obere Anschlag ist dabei der wichtigere: auf einem Ultrawide wäre eine Überschrift, die mit dem Fenster weiterwächst, unlesbar. Gemessen bei 3440 px: Überschrift 56 px, Fließtext 19 px, Zeilenlänge 57 Zeichen.
- Breiten sind je Aufgabe gedeckelt, nicht je Bildschirm. `--width-narrow` für Fließtext, `--width-normal` für den Normalfall, `--width-wide` für Raster und Tabellen. Auf einem breiten Schirm bleiben deshalb bewusst Ränder stehen.
- Kartenraster benutzen `auto-fit` mit `minmax(min(100%, …), 1fr)`. Die Spaltenzahl folgt dem Platz: eine auf dem Telefon, vier auf WQHD, ohne eine einzige Medienabfrage.
- Die Navigation ist unterhalb von 768 px ein Hamburger-Menü. Ohne JavaScript bleibt die Liste sichtbar und benutzbar; erst ein kleines Inline-Skript macht daraus den Burger. Ein Menü, das ohne Skript nicht aufgeht, wäre schlechter als gar keines.
- Tabellen mit längerem Text werden auf dem Telefon zu einem Block je Zeile, mit der Spaltenüberschrift vor jedem Wert. Seitliches Scrollen sieht bei drei Spalten nach einem Layoutfehler aus, weil die versteckte dritte Spalte die Zeile hoch macht.

## Bilder der Oberfläche

Die Bilder unter `src/assets/screens/` sind **Entwürfe** aus dem Oberflächen-Entwurf vom 19.09.2026, keine Fotos einer laufenden Installation. Wo ein Bild einen Bildschirm zeigt, den es noch nicht gibt, trägt es die Marke „Entwurf". Das ist die Aufgabe des Attributs `draft` an der Komponente `Screenshot`, und es gehört an jedes Bild, dessen Funktion noch aussteht.

Sie liegen als 1x-Export vor. Der Bildrahmen hört deshalb bei 1280 px auf: darüber würde die Aufnahme nur weich, nicht größer. Wer die Artboards neu exportiert, exportiert am besten in 2x, dann kann die Grenze fallen.

## Marke

Die Quelle aller Logo- und Icondateien ist und bleibt [`opengewerk/.github`](https://github.com/opengewerk/.github), Ordner `brand/`. Unter `public/marke/` liegen Kopien, aus demselben Grund, aus dem die Anwendung welche hat: eine self-hosted Seite darf ihr Logo nicht zur Laufzeit von GitHub nachladen. **Änderungen gehen zuerst in das Markenrepository, danach wird kopiert, nie umgekehrt.**

Auch die Schrift Barlow liegt im Bündel und kommt nicht von einem fremden Server. Das ist keine Kleinigkeit, sondern der Grund, warum die Datenschutzerklärung dieser Seite so kurz sein kann.

## Suchmaschinen

Was dafür eingebaut ist, damit es niemand erneut sucht:

- Je Seite ein eigener Titel und eine eigene Beschreibung, beide für die Trefferliste geschrieben und nicht für uns.
- `canonical` auf jeder Seite, Open Graph und Twitter-Card für die Vorschau beim Teilen.
- `sitemap-index.xml` entsteht beim Bauen. Impressum und Datenschutz stehen nicht darin: sie sollen gefunden werden dürfen, aber sie tragen keine Suchabsicht.
- `robots.txt` verweist auf die Sitemap.
- Strukturierte Daten: `SoftwareApplication` und `Organization` auf der Startseite, `BreadcrumbList` auf jeder Unterseite, `FAQPage` auf den drei Seiten, die wirklich sichtbare Fragen und Antworten haben. Ausgezeichnet wird nur, was auch auf der Seite steht.
- Adressen tragen immer einen Schrägstrich am Ende, passend zu `trailingSlash: 'always'`. Damit läuft kein interner Verweis über eine Weiterleitung.
- `check-links.mjs` fängt den vertippten internen Verweis, den sonst niemand bemerkt.

## Ausliefern

Ein Push auf `main` baut und spielt in die Webwurzel auf dem Server aus. Die CI ist das Tor davor. Live ist die Seite seit dem 21.09.2026.

Der Abgleich läuft mit `--delete`, damit eine gelöschte Seite wirklich verschwindet. **Ausgenommen ist `/schemas/`**: die JSON-Schemas des Kanzlei-Vertrags kommen nicht aus diesem Repository, sondern von `opengewerk-assets.sh` auf dem Server, und eine einmal veröffentlichte `$id` muss erreichbar bleiben.

**Das Ziel steht nicht im Repository, sondern auf dem Server.** Der Schlüssel ist
dort in `authorized_keys` auf `rrsync -wo <Webwurzel>` festgenagelt, kann also
ausschließlich in dieses eine Verzeichnis schreiben und nicht einmal eine Shell
öffnen. Deshalb trägt das Ziel im Workflow keinen Pfad, `rrsync` löst den leeren
Pfad auf sein Wurzelverzeichnis auf. Ein Schlüssel, der in den Secrets eines
öffentlichen Repositories liegt, soll genau seine Aufgabe können und sonst nichts.

Fünf Secrets:

| Secret | Inhalt |
| --- | --- |
| `SSH_HOST` | Der Server |
| `SSH_PORT` | Der SSH-Port |
| `SSH_USER` | Der Deploy-Benutzer, hier `opengewerk` |
| `SSH_KEY` | Sein privater Schlüssel. Liegt im Proton-Pass-Tresor unter „SSH Keys" |
| `SSH_KNOWN_HOSTS` | Der Hostkey des Servers. Absichtlich ein Secret und kein `ssh-keyscan` zur Laufzeit: wer beim Verbinden fragt, wem er vertrauen soll, prüft nichts |

Auf dem Server dazu: ein eigener Benutzer `opengewerk` ohne Passwort-Login, die
Webwurzel gehört ihm mit Gruppe `www-data` und gesetztem setgid-Bit, und
`/schemas/` bleibt bei `www-data`, weil es aus dem anderen Weg kommt. `rsync` und
`rrsync` liegen unter `/usr/bin/`.

Dass die Beschränkung wirklich greift, zeigt der Versuch, etwas anderes zu tun:

```
$ ssh -i <key> opengewerk@<host> "id"
/usr/bin/rrsync error: SSH_ORIGINAL_COMMAND does not run rsync
```

## Eine Eigenheit, die nach einem Fehler aussieht

Unter dem Modulnamen `typescript` hängt nicht TypeScript 7, sondern die Kompatibilitätsfassung 6.0. Grund ist derselbe wie im Anwendungsrepository: TypeScript 7 bringt keine Programmierschnittstelle mehr mit, und `astro check` braucht genau die. Wer den Eintrag wieder auf 7 stellt, legt die Typprüfung still.

## Lizenz

[AGPL-3.0](LICENSE), wie die Anwendungen. Texte und Bilder dieser Seite gehören zum Projekt.
