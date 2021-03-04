---
title: 'Warum grav besser ist als [dein lieblings CMS]'
date: 04-03-2021 21:00
taxonomy:
  category:
    - Entwicklung
    - Code
  tag:
    - grav
    - Content Management System
    - Frontend
---
Als ich 2020 bei [Zebra](https://zebra.de) anfing, war die Aufgabe klar: Wir brauchen einen Tech Stack, der viel flexibler und schneller ist als das was bisher in der Agentur genutzt wurde. Mein neuer (alter) Vorgesetzter Danilo hatte da auch schon was ausgemacht: [grav](https://getgrav.org).

===

* Es ist dateibasiert und darum sehr schnell.
* Unter der Haube verwendet es das PHP Framework Symfony, was es gut erweiterbar macht.
* Es verwendet Twig als Templating-Engine.
* Inhalte werden mit Markdown erfasst und das Templating erfolgt mit Twig.
* Es gib ein Admin Interface (als Plugin), aber das System funktioniert auch ohne.

Ich hatte schon seit 10 Jahren ein gestörtes Verhältnis zu dem CMS, das in der Agentur genutzt wurde. Es ist dieses System, das hauptsächlich im deutschsprachigen Raum wie ein Fetisch verehrt wird. Ich war schon eher (irgendwo kurz vor Version 1.5) auf den WordPress Zug gesprungen weil es schnell lief, ein intuitives Admin-Interface bot und Themes mit einfachen PHP Kenntnissen schnell zu realisieren waren. Damit habe ich über die Jahre auch eine Menge Projekte umgesetzt, aber im Verlauf der 4er Version wurde es immer überladener. Mit Version 5 und dem Klicki-Bunti-Editor-Krempel (a.k.a. Gutenberg) war der Spaß dann aber vorbei. Ein ehemaliger Kollege hat das später sehr gut zusammen gefasst:

>In #WordPress landet auch in jeder Version mehr Rotz, den man erst mühsam wieder ausbauen muss :(
>
>
> — [@mirksch](https://twitter.com/mirksch/status/1287376452892217345)

Dieses glänzende, neue Spielzeug kam also gerade recht. Ich arbeite sehr gern damit, aber der Einstieg war manchmal holprig, weil nicht alle Features gut dokumentiert sind. Wenn es aber mal nicht weiterging, war der [discord Chat von grav](https://chat.getgrav.org/) immer eine große Hilfe.

Wie schon geschrieben, arbeite ich sehr gern mit grav und möchte hier mal einen "kleinen" Überblick geben.

## Simples Setup

Um loszulegen, das .zip (mit oder ohne Admin-Interface) [herunterladen](https://getgrav.org/downloads), entpacken und über einen PHP-fähigen Webserver (LAMP, XAMPP, MAMP, docker, ddev, etc.) aufrufen. Es gibt auch die Möglichkeit einen PHP eigenen [Webserver im Terminal zu starten](https://learn.getgrav.org/17/basics/installation#running-grav-with-the-built-in-php-webserver-using-router-php).

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

Die [Ordnerstruktur in `pages`](https://learn.getgrav.org/17/content/content-pages) bildet exakt den Seitenbaum ab, der auch von der Navigation oder vom Sitemap-Plugin ausgeben werden kann. Die einzelnen Seiten können Eigenschaften enthalten, die sie aus dieses Auflistungen raushalten, Inhalte anderer Seiten anzeigen (Routing) oder auch auf andere Seiten weiterleiten.

Im Beispiel oben haben wir vier Seiten auf der ersten Ebene, die durch die Nummern vor dem Punkt im Namen ihre Sortierung erhalten. Die Namen der darin enthaltenen Dateien sind gleich bedeutend mit dem Namen des Template, durch dass sie ausgegeben werden sollen. Also die Seite "About" nutzt das Template namens "default".

Keine Angst wegen der seltsamen Ordnerbenennung, grav kümmert sich drum. So wird `02.about` unter `/about` zur Verfügung stehen. Ein Eintrag im Blog z.B. unter `/blog/new-website-live`.

In `03.service` sehen wir noch eine Besonderheit von grav: Modulars. Modulars werden durch den Unterstrich (_) am Beginn des Ordnernamen definiert. Sie werden von grav nicht wie Unterseiten behandelt und können so zur Strukturierung einer einzelnen Seite genutzt werden. Dazu mehr beim Thema Templates.

## Inhalte
grav hat keine Datenbank, sondern speichert alle Inhalte in einfachen Textdateien - genauer gesagt [Markdown](https://de.wikipedia.org/wiki/Markdown). Zusätzliche Informationen zu einer Seite wird im sogenannten Frontmatter gespeichert, was der Syntax von [YAML](https://de.wikipedia.org/wiki/YAML) folgt.

```md
---
title: 'Titel der Seite'
menu: 'Abweichende Bezeichnung in der Navigation'
hero_image: 'foobar.jpg'
---
Inhalt der Seite als Markdown

## Überschrift zweiter Ordnung

Weiterer Text als **Markdown**.

![](grafik-im-selben-ordner.jpg)
```

Was mich an diesem Vorgehen am meisten begeistert hat, war dass man im Frontmatter unbeschränkt eigene Informationen einstreuen kann. Für ein Interface im Admin-Interface braucht es hier etwas YAML (dazu später mehr), während bei WordPress mindestens ein Plugin und eine Hand voll (ziemlich redundante) PHP-Funktionen nötig sind.

So können Metainformationen und Eigenschaften notiert werden (nicht nur Strings, sondern auch Arrays/Objekte) und stehen dann im Template in dem Twig-Objekt ``page.header`` bereit. Es gibt einen kleinen Stapel von [reservierten Eigenschaften im Frontmatter](https://learn.getgrav.org/17/content/headers), mit denen grav arbeitet, z.B. um den Slug, das Routing oder das Template zu beeinflussen.

Seit Version 1.7 gibt es auch die sogenannten [Flex Objects](https://learn.getgrav.org/17/advanced/flex). Das ist eine Art Datenbank, die auf Basis von JSON Dateien funktioniert. Dabei können die Informationen unabhängig vom Seitenbaum gespeichert werden.

## Admin und Konfiguration
Bei meinen bisherigen Projekten spielte das Admin-Interface keine so große Rolle, da sich alle Einstellungen am System direkt in YAML Dateien machen lassen. Außerdem schreibt der Admin immer die Vollständige Config neu, sodass man nicht mehr nur die Abweichungen vom Standard in der Datei hat, was ich persönlich eher unpraktisch finde.

Aber natürlich ist der Admin-Bereich für Redakteure und Admins ziemlich brauchbar. So einfach wie wir in den Markdown-Dateien eigene Zusatzinfos unterbekommen, so leicht lassen sich dafür eigene Felder im Admin anlegen. Dazu braucht es die sogenannten blueprints. Das sind YAML Dateien, die über den Dateinamen wie auch die Markdown-Datei dem entsprechenden Template zugeordnet werden.

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

Am Beispiel des Ausschnitts aus der `/user/themes/customtheme/blueprints/default.yaml` können wir sehen wie zwei Felder auf dem "Inhalt" Tab der Standard-Text-Seite erzeugt werden. Zum einen eine Bildauswahl für ein Titelbild und ein Textfeld, das im Template z. B. einen Text über dieses Bild legt.

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

## Plugins

Das Plugin Ökosystem bei grav ist noch überschaubar aber viele wichtige Dinge sind schon da: Breadcrumb, Sitemap, SEO, Formulare, Embeds,…

## Versionierung und Entwicklung

Zur Versionierung von Themes, Inhalten oder ganzen grav-Instanzen gibt es unterschiedliche Ansätze. Ein praktischer Weg sind grav's sogenannte `Skeletons`. Dabei wird der `user` Ordner in einem git Repository verwaltet. Darin befindet sich neben dem Seitenbaum auch eine `.dependencies` Datei die Informationen über Themes und Plugins bereithält und mit der dann alles nötige nachinstalliert werden kann. Diesen Weg werde ich einem weiteren Beitrag noch näher beschreiben, aber in den unten verlinkten Projekten lässt sich das ganze schon bestaunen.

Es gibt auch noch ein git-sync Plugin, dass explizite Teile des user Ordners unabhängig vom eigentlich Projekt in einem git-Repository verwalten kann (und auch automatisch syncronisiert).

Außerdem bietet grav auch [<abbr title="command line interface" lang="en">CLI</abbr>-Schnittstellen](https://learn.getgrav.org/17/cli-console/command-line-intro) an. Darüber lassen sich Plugins und Themes verwalten, Updates durchführen, Backups erstellen, oder mit den Schnittstellen von Plugins interagieren.

Übrigens: Ein Serverumzug ist nichts weiter als Wurzelverzeichnis des Projekt auf den neuen Server zu kopieren.

## Abschließende Worte

Verglichen mit WordPress ist grav ein Leichtgewicht - auch bei der Verbreitung. Aber es bietet mir die Freiheiten und die Performance, dich ich früher bei WordPress hatte. Neben undokumentierten Funktionen oder einer Lernkurve für Symfony überwiegen für mich die Vorteile.

Ich habe zu grav noch ein Paar Blog Beiträge in der Schublade und will noch einige technische Aspekte und einige meiner Lösungen genauer vorstellen.

## Ressourcen
Ein neues System lerne ich immer durch konkrete Beispiele am besten kennen. So kann ich Ursache und Wirkung sehen und damit herum spielen. Aus diesem Grund habe ich hier ein paar meiner Projekte zum sezieren:

|Projekt|Anmerkung|
|---|---|
|[kitchen](https://github.com/bitstarr/kitchen)|Meine persönliche Rezepte Sammlung und erstes Side Projekt auf grav Basis|
|[grav-ddev-kickstart](https://github.com/bitstarr/grav-ddev-kickstart)|Um schnell die Basis für ein neues Projekt zu schaffen habe ich einiges automatisiert. Nach der Initialisierung kann losgearbeitet werden und das neue Projekt ist auch auf Versionierung vorbereitet. [ddev](https://ddev.com) stellt mir dabei eine docker basierte lokale Umgebung bereit.|
|[sebastianlaube](https://github.com/bitstarr/sebastianlaube)|Das git Repo zu  dieser Website|
|[chassis](https://github.com/bitstarr/grav-theme-chassis)|Meine Theme Boilerplate. Auf dieser Basis entwickle ich die Frontends meiner Projekte.|