---
title: 'Mein neuer Ansatz zum Erzeugen von Frontend Assets'
date: 2023-02-21 13:37
taxonomy:
  category:
    - Entwicklung
    - Code
  tag:
    - Frontend
    - grav
    - node
    - Tools
metadata:
  description: Wie ich von gulp als Build Tool und Task Runner auf Node Scripts umgestiegen bin.
---

Jahrelang habe ich [gulp](https://gulpjs.com/) als Task-Runner verwendet, um all die Routineaufgaben zu erledigen, die wir vor über 10 Jahren von Hand erledigt haben. Zuerst, so um 2012 oder 2013, habe ich [grunt](https://gruntjs.com/) verwendet, aber als ich das Gefühl hatte, dass es zunehmend verwaiste, bin ich zu gulp gewechselt. Inzwischen scheinen einige Teile dieses Setups auch vernachlässigt worden zu sein. Aber ich hatte dieser Tage endlich die Zeit und Gelegenheit das Problem anzugehen und Abhängigkeiten zu reduzieren.

===

## Ein wenig Vorgeschichte

In den vergangenen Jahren haben einige Module, die ich für die gulp-Prozesse verwendet habe, in ihren aktuellsten Versionen nicht mehr funktioniert, weil die Abhängigkeiten nicht mehr aktuell waren. Also musste ich mehr und mehr Versionen einfrieren, anstatt immer auf die aktuellste Version zu setzen (ich weiß, dass das nicht best practice ist). Das Festnageln der Versionen von Abhängigkeiten auf jahre alte Versionen war besorgniserregend.

Im Jahr 2018 habe ich verschiedene Ansätze ausprobiert, um meinen Build-Prozess zu überarbeiten. webpack wurde zu dieser Zeit sehr gehypt, aber es entsprach nicht meinen Erwartungen, also versuchte ich es mit einfachem Shell-Scripting und ein wenig Node-Scripting. Keines davon war meinem damaligen Komfortzone-grunt-Workflow überlegen. Also wechselte ich am Ende nur von grunt zu gulp.

Jetzt, im Jahr 2023, konnte ich die Meldungen zu veralteten und verwundbaren Paketen nicht mehr ignorieren. Die Zahl der Sicherheitslücken schien mit jedem neuen Projekt, das ich begann, zu steigen. Glücklicherweise hatte ich etwas Zeit, um Node Scripting einen neuen Versuch zu geben.

Als Beispiel transformiere ich hier den Workflow meiner [theme boilderplate 'chassis'](https://github.com/bitstarr/grav-theme-chassis) für [grav](getgrav.org/).

## Was erwarte ich? / Welche Aufgaben werden eigentlich erledigt?

Ich bin keiner der mit fancy JavaScript Frameworks hantiert. Ich orientiere mich eher an universellen Webstandards und liebe es, Frontends in solidem HTML und CSS zu erstellen, wobei ich JS meist aus Gründen der Barrierefreiheit oder für progressive enhancement verwende.

### CSS 

PostCSS übernimmt hier die schwere Arbeit. Es werden `@import` Anweisungen zusammengeführt, nesting aufgelöst und mit autoprefix angereichert.

`/assets/css/main.css` ist die Haupt-CSS-Datei und der Knotenpunkt. Darin befinden sich nur Importe, die bei der Verarbeitung zusammengefügt werden. Bei Bedarf kann ich parallel zu main.css weitere CSS-Dateien hinzufügen, um andere Untergruppen oder Styles mit unterschiedlichen Geltungsbereich (scope) bereitzustellen. Jede CSS-Datei, die direkt in `/assets/css/` gespeichert ist, wird verarbeitet und das Ergebnis in `/dist/css/` gespeichert.

Zusätzlich wird dies auch mit CSS-Dateien in `/assets/css/page` geschehen. So können Sie pro Seite/View Ergänzungen oder Überschreibungen erstellen, die von Templates eingebunden werden können.

### JS Dateien und Bundles

Da keine Frameworks im Spiel sind, muss ich nur einige JS-Dateien (meist unabhängige, funktional geschlossene Komponenten) und vielleicht einige Bibliotheken bündeln (verketten/concat), die wir via npm/package.json verwalten.

In `/assets/js` befinden sich .js und .json Dateien sowie ein `src` Ordner. JSON-Dateien sind die Basis für Bundles. Mit diesen möchte ich mehrere Komponenten aus dem Ordner `src` sowie Bibliotheken aus `/node_modules` verketten. Bei Bundles ist die Reihenfolge wichtig. Die Bibliotheken werden vor dem Code aus `src` erscheinen.

Jede JS-Datei (nicht JSON) in `/assets/js` wird einfach in `/dist/js` kopiert. Bundles sollten eine Verkettung ihrer Teile durchlaufen und das Ergebnis wird ebenfalls als .js in `/dist/js` gespeichert. Beim Build werden diesen Schritten noch die Minifizierung hinzugefügt.

````json
{
    "lib": [
        "choices.js/public/assets/scripts/choices.min.js"
    ],
    "src": [
        "address.js",
        "userprofile.js"
    ]
}
````

### Bilder

Alle Bilddateien in `/assets/img` werden beim Build optimiert (svgo, pngQuant, mozJpeg, gifsicle, Zopfli) und in `/dist/img` gespeichert. Bei Verwendung des Watch-Task werden die Bilder einfach stumpf kopiert, um Wartezeiten bei der Entwicklung zu vermeiden.

### Icons

Alle Icons in `/assets/icon` werden beim Speichern optimiert (Watch-Task) und in `/dist/icons/` gespeichert. Die Optimierung wird immer gemacht, weil der Code der SVGs von Dingen bereinigt wird, die für eine direkte Verwendung als `<svg>` in `<html>` unnötig oder fehlerhaft sind.

### Webfonts

Die .woff2 Dateien in `/assets/fonts` sollten nach Bedarf nach `/dist/fonts` kopiert werden. Diese Schriften werden vorher im Umfang reduziert (subsetting), aber das könnte auch Teil des Prozesses sein (was Abhängigkeiten außerhalb des node space mit sich bringt).

### Favicons

Ich brauche eine Möglichkeit, alle notwendigen Favicon-Dateien zu optimieren. Es könnte auch eine Gelegenheit sein, den Besuch von realfavicongenerator zu überspringen und die Dateien aus einer SVG lokal zu erzeugen.

### Watch / Browsersync / LiveReload

Natürlich möchte ich die Automatisierung nicht nach jedem Datei-Speichern manuell auslösen. Also muss es einen Überwachungsjob (watch) geben. Auch ein Live-Relaying oder BrowserSync für Multi-Device-Tests wären gut.

## Von gulp zu reinem node

Das gulp Setup hatte 29 Abhängigkeiten, während das neue nur eine weniger hat, aber wir lassen die gulp Wrapper um die meisten von ihnen hinter uns. Betrachtet man jedoch die Anzahl der Abhängigkeiten (`npm ls --depth=1 | wc -l`), so sank die Anzahl von 280 auf 247. Die Abhängigkeiten auf der zweiten Ebene fielen von 781 auf 606. Auch die Anzahl der Deprication Warnings während des `npm install` ging deutlich zurück.

Da ich kein erfahrener JengaScript- oder Node-Profi bin, musste ich mich ziemlich oft mit JS-Promises herumschlagen, aber schließlich klappte alles. Im Vergleich zum gulp Setup gibt es jetzt den Ordner `.tasks` im Node-Setup. Darin befinden sich eine Reihe von .mjs-Dateien, eine Konfiguration für BrowserSync und ein Shell-Skript zum Erstellen von Favicons (es gibt kein npm-Packet, das alle Möglichkeiten von Image Magick richtig ausnutzen kann).

Im Abschnitt `scripts` der `package.json` werden diese verwendet.

```json
    "scripts": {
        "js": "node .tasks/javascript-dev.mjs",
        "jsmin": "node .tasks/javascript-build.mjs",

        "css": "node .tasks/postcss-dev.mjs",
        "cssmin": "node .tasks/postcss-build.mjs",

        "fonts": "node .tasks/fonts.mjs",

        "lint:css": "npx stylelint $npm_package_config_css",
        "lint:js": "npx eslint $npm_package_config_js",
        "lint": "run-p lint:*",

        "img": "mkdir -p $npm_package_config_imgDist; cp -r $npm_package_config_img/* $npm_package_config_imgDist",
        "imagemin": "node .tasks/images.mjs",
        "icons": "node .tasks/icons.mjs",
        "sprite": "node .tasks/svgsprite.mjs",
        "favicons": "sh .tasks/favicons.sh $npm_package_config_favicons $npm_package_config_faviconsDist",
        "faviconsmin": "node .tasks/faviconsmin.mjs",

        "watch:css": "npx onchange $npm_package_config_css/**/*.css -- npm run css",
        "watch:js": "npx onchange $npm_package_config_js/**/*.{js,json} -- npm run js",
        "watch:img": "npx onchange $npm_package_config_img/**/*.{jpg,gif,png,svg} -- npm img",
        "watch:icons": "npx onchange $npm_package_config_icons/**/*.{svg} -- npm run icons",
        "watch:sprite": "npx onchange $npm_package_config_icons/**/*.{svg} -- npm run sprite",
        "watch": "run-p watch:*",

        "sync:devices": "npx browser-sync start --config .tasks/browsersyncrc.js",
        "sync:watch": "run-p watch:*",
        "sync": "run-p sync:*",

        "todo": "grep -lir --color --exclude-dir=node_modules --exclude-dir=vendor --exclude-dir=var --exclude=package.json 'todo'",
        "clean": "rm -rf $npm_package_config_dist/*",

        "dev": "run-s css js img icons",
        "build": "npm run lint && run-p cssmin jsmin imagemin icons fonts"
    }
```
Um die Ergebnisse zu vergleichen, habe ich zwei Ordner mit dem alten und dem neuen Workflow eingerichtet. Eine Beobachtung ist, dass einige Linter und Minifier in neueren Versionen etwas anders arbeiten (da die gulp Versionen bei einer älteren Version fixiert wurden), was Unterschiede in den Dateigrößen mit sich bringt.

| File | gulp | node |
| --- | --- | --- |
| dist/css/main.css | 26655 B | 27246 B |
| dist/icons/alert.svg | 542 B | 405 B |
| dist/icons/angl-left.svg | 215 B | 217 B |
| dist/icons/phone.svg | 462 B | 370 B |
| dist/img/social.png | 5278 B | 5278 B |
| dist/js/main.js | 3685 B | 3685 B |


Zum Beispiel entfernt `cssnano` nicht mehr die unnötigen, umschließenden Leerzeichen aus CSS var()-Definitionen wie bei `color:var( --_txt,#fff );`.

Ich habe auch von der Entscheidung von styelint erfahren, die Unterstützung für stilistische Regeln (über Präferenzen, wie du deinen Code gestaltest, wie Tabs, wo du Leerzeichen setzt, usw.) einzustellen. Man wird aufgefordert, stattdessen auf 'Prettier' umzusteigen. Und das war ein kleines Kaninchenloch in die Kultur der Bro-Programmierer und das Ignorieren von Benutzeranforderungen. Es gibt keine andere Lösung als stylint in der Version 14 einzufrieren, bis es eine praktikable Alternative für CSS Code-Style Belange gibt.

Aber im Großen und Ganzen können wir sehen, dass es keine großen Unterschiede in der Dateigröße der optimierten Dateien gibt, was ein Ergebnis ist, mit dem ich ziemlich zufrieden bin.

!! Ich habe den code in einem [GitHub Reop veröffentlicht](https://github.com/bitstarr/new-build-process). Schau dir die Dateien in Ruhe an und entscheide was für dich von Nutzen sein kann. Ich freue mich über Verbesserungsvorschläge.

! Da ich mich während meiner Arbeitszeit ausgiebig mit dem Thema beschäftigen durfte, sei an dieser Stelle der [mindbox](https://mindbox.de/) gedankt. Wir suchen übrigens gerade Versärkung im Entwicklungsbereich ;)