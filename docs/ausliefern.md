# Ausliefern

Wie ein Push auf `main` auf den Server kommt, mit welchem Schlüssel und welchen Secrets.

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
