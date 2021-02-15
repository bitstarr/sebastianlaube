---
title: 'Warum grav besser ist als [dein lieblings CMS]'
date: 22-01-2021 18:00
taxonomy:
  category:
    - Entwicklung
    - Code
---
Als ich 2020 bei Zebra anfing, war die Aufgabe klar: Wir brauchen einen Tech Stack, der viel flexibler und schneller ist als das was bisher in der Agentur genutzt wurde. Mein neuer (alter) Vorgesetzter Danilo hatte da auch schon was ausgemacht: [grav](https://getgrav.org).

===

* Es ist dateibasiert und darum sehr schnell.
* Unter der Haube verwendet es das PHP Framework Symfony, was es gut erweiterbar macht.
* Es verwendet Twig als Templating-Engine.
* Inhalte werden mit Markdown erfasst und das Templating erfolgt mit Twig.
* Es gib ein Admin Interface (als Plugin), aber das Systen funktioniert auch ohne.

Ich hatte schon seit 10 Jahren ein gestörtes Verhältnis zu dem CMS, das in der Agentur genutzt wurde. Es ist dieses System, das haptsächlich im deutschsprachigen Raum wie ein Fetisch verehrt wird. Ich war schon eher (irgendwo kurz vor Version 1.5) auf den WordPress Zug gesprungen, weil es schnell lief und  Themes mit einfachen PHP Kenntnissen schnell zu realisieren waren. Damit habe ich über die Jahre auch eine Menge Projekte umgesetzt, aber im Verlauf der 4er Version wurde es immer überladener. Mit Version 5 und dem Klicki-Bunti-Editor-Krempel war der Spaß dann aber vorbei. Ein ehemaliger Kollege hat das später sehr gut zusammen gefasst:

https://twitter.com/mirksch/status/1287376452892217345

Dieses glänzende, neue Spielzeug kam also gerade recht. Ich arbeite sehr gern damit, aber der Einstieg war manchmal holprig, weil nicht alle Features gut dokumentiert sind. Darum will ich hier mal eine Einführung geben.

## Ordner und Seitenbaum

Nach der Installation von grav finden sich ein paar [Ordner auf dem Server](https://learn.getgrav.org/17/basics/folder-structure), der Wichtigste ist `user`.

```
├── /user
│   ├── /accounts
│   ├── /config
│   │   ├── /plugins
│   │   │   └── breadcrumbs.yaml
│   │   ├── site.yaml
│   │   └── system.yaml
│   ├── /data
│   ├── /pages
│   │   ├── /01.home
│   │   │   └── home.md
│   │   ├── /02.about
│   │   │   └── default.md
│   │   ├── /03.service
│   │   │   ├── /01._webdesign
│   │   │   │   └── default.md
│   │   │   ├── /02._development
│   │   │   │   └── default.md
│   │   │   ├── /03._hosting
│   │   │   │   └── default.md
│   │   │   └── modular.md
│   │   └── /04.blog
│   │       ├── /crazy-things-happen
│   │       │   └── post.md
│   │       ├── /new-website-live
│   │       │   └── post.md
│   │       └── blog.md
│   ├── /plugins
│   └── /themes
│       └── /quark
```

|Pfad|Funktion|
|---|---|
|accounts/|Alle User des Admins wird hier als Datei angelegt|
|config/|Konfigurationsdateien für System, Seiten, Plugins, Themes|
|data/|Hier legen Plugins Daten ab|
|pages/|Hier ist der Seitenbaum, der auch alle Inhalte enthält|
|plugins/|Plugins werden hier hin installiert|
|themes/|Themes werden hier hin installiert|

Die [Ordnerstruktur](https://learn.getgrav.org/17/content/content-pages) bildet extakt den Seitenbaum ab, der auch von der Navigation oder vom Sitemap-Plugin ausgeben werden kann. Die einzelnen Seiten können Eigenschaften enthalten, die sie aus dieses Auflistungen raushalten, Inhalte anderer Seiten anzeigen (Routing) oder auch auf andere Seieten weiterleiten.

Im Beispiel oben haben wir vier Seiten auf der ersten Ebene, die durch die Nummern vor dem Punkt im Namen ihre Sortierung erhalten. Die Namen der darin enhaltenen Dateien sind gleich bedeutend mit dem Template, durch dass sie ausgegeben werden sollen. Also die Seite "About" nutzt das Template namens "default".

Keine Angst wegen der seltsamen Ordnerbenamung, grav kümmert sich drum. So wird `02.about` unter `/about` zur Verügung stehen. Ein Eintrag im Blog z.B. unter `/blog/new-website-live`.

In `03.service` sehen wir noch eine Besonderheit von grav: Modulars. Modulars werden durch den Unterstrich (_) im Ordnernamen definiert. Sie werden von grav nicht wie Unterseiten behandelt und können so zur Strukturierung einer einzelnen Seite genutzt werden. Dazu mehr beim Thema Templates.

## Inhalte
grav hat keine Datenbank, sondern speichtert alle Inhalte in einfachen Textdateien - genauer gesagt [Markdown](https://de.wikipedia.org/wiki/Markdown). Zusätzliche Informationen zu einer Seite wird im sogenannten Frontmatter gespeichert, was der Syntax von [YAML](https://de.wikipedia.org/wiki/YAML) folgt.

```md
---
title: 'Titel der Seite'
menu: 'Abweichende Bezeichnung in der Navigation'
hero_image: 'foobar.jpg'
---
Inhalt der Seite als Markdown

## Überschrift zweiter Ordnung

Weiterer Text als **Markdown**.
```

Was mich an diesem Vorgehen am meisten getriggert hat, war dass man im Frontmatter unbeschränkt eigene Informationen einstreuen kann. Für ein Interface im Admin-Interface braucht es hier etwas YAML (dazu später mehr), während bei WordPress mindestens ein Plugin und eine Hand voll (ziemlich redundate) PHP-Funktionen nötig sind.

So können Metainformationen und Eigenschaften notiert werden (nicht nur Strings, sondern auch Arrays und Objekte) und stehen dann im Template in dem Twig-Objekt ``page.header`` bereit. Es gibt einen kleinen Stapel von [reservierten Eigenschaften im Frontmatter](https://learn.getgrav.org/17/content/headers), mit denen grav arbeitet, z.B. um den Slug, das Routing oder das Template zu beeinflussen.

## Admin und Konfiguration
Bei meinen bisherigen Projekten spielte das Admin-Interface keine so große Rolle, da sich alle Einstellungen am System direkt in YAML Dateien machen lassen. Außerdem schreibt der Admin immer die Vollständige Config neu, sodass man nicht mehr nur die Abweichungen vom Standard in der Datei hat, was ich persönlich eher unpraktisch fände.

Aber natürlich ist der Admin-Bereich für Redakteure und Admin ziemlich brauchbar. So einfach wie wir in den Markdown-Dateien eigene Zusatzinfos unterbekommen, so leicht lassen sich dafür eignene Felder im Admin anlegen. Dazu braucht es die sogenannten blueprints. Das sind YAML Dateien, die über den Dateinamen wie auch die Markdown-Datei dem entsprechnden Template zugeordnet werden.

```yaml
title: Page Content
extends@:
  type: default
  context: blueprints://pages

form:
  fields:
    tabs:
      type: tabs
      active: 1

      fields:
        content:
          type: tab
          fields:
            header.hero_image:
              type: filepicker
              label: Titelbild
              preview_images: true
              folder: '@self'
              accept:
                - image/*

            header.headline:
              type: text
              label: Überschrift auf dem Titelbild
              toggleable: true
```

Am Beispiel des Ausschnitts aus der `/user/themes/customtheme/blueprints/default.yaml` können wir sehen wie zwei Felder auf dem "Inhalt" Tab der Standard-Text-Seite erzeugt werden. Zum einen eine Bildauswahl für ein Titelbild und ein Textfeld, das im Template z. B. einen text über dieses Bild legt.


@Blueprints, theme config/site config für navis oder soc media?

## Themes und Blueprints

```
/user/themes/customtheme
├── /blueprints
│   ├── /modular
│   │   └── default.yaml
│   └── default.yaml
├── /classes
│   └── Utils.php
├── /templates
│   ├── /modular
│   │   └── default.html.twig
│   ├── /partials
│   │   └── base.html.twig
│   ├── /default.html.twig
│   ├── /modular.html.twig
│   └── /post.html.twig
├── /blueprints.yaml
├── /customtheme.php
└── /customtheme.yaml
```

Essentiell für ein Theme ist die `blueprints.yaml`. Darin stehen die wichtigsten Sachen über das Theme. Außerdem können darin Felder für den Admin vorgesehen werden um dann ein grafisches Interface für die Theme-Einstellungen bereit zu stellen. Voreinstellungen können dann in einer eigenen YAML Datei hinterlegt werden.

Beim Templating kommt Twig zum Einsatz. Die Aufteilung oder Zerstückelung der Templates ist im Grunde genommen egal. Wichtig ist, dass im Ornder `templates` immer ein Template zu finden ist, dessen Namen mit dem der Markdown-Datei übereistimmt, die gerade geladen werden soll.

Wie oben schon erwähnt, können wir in den Seiten soviel Infos in den Frontmatter packen, wie wir wollen. Im Ornder `blueprints` können wir zu jedem Template eine YAML Datei anlegen und das Admin-Interface dazu bestimmen, so dass es zu jeder Information auch nutzerfreundliche Eingabemöglichkeiten gibt.

Im Templates können wir auch auf alle Konfigurationen zugreifen, also `system`, `site` und `theme`. So wird es möglich an einer dieser Stellen ein Array für eine Footer-Navigation oder globale Infos wie Adresse, Telefonnummern o.Ä. unter zu bringen.

## Templates

@modular, page collections

## Plugins

## Skeletons + Versionsverwaltung

## Abschließende Worte
@repos raushauen
* Chassis
* Kickstart
* sl.de