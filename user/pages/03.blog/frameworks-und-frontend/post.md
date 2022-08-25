---
title: 'Warum ich keinen Bock auf eure fancy Frontend-Frameworks habe'
date: 25-08-2022 13:37
taxonomy:
  category:
    - Entwicklung
    - Arbeitswelt
  tag:
    - grav
    - Content Management System
    - Frontend
---

Ich werde ständig auf Xing mit Anfragen beworfen. Das ist schmeichelhaft, aber meistens lesen die Headhunter mein Profil nicht, in dem steht, dass ich keinen Bock auf React und Co habe. Aber was mache ich als Frontend Entwickler eigentlich, wenn ich nicht über das Stöckchen der trendy JengaScript-Frontend-Frameworks springen will?

===

! TL;DR Es mangelt ihnen oft an Performance, schleppen einen großen Overhead mit sich rum und ich hab keine Lust Logiken, Routing und andere CMS Features selbst integrieren zu müssen. Meine Baustelle ist die Front des Frontends.

---

Es gibt einen Haufen Adjektive die einem „echten Frontend Entwickler“ in den Kopf kommen, wenn er die Einleitung gelesen hat. Konservativ, Rückständig, Komfortzone… Ich denke es ist aber ein Missverständnis darüber, was Frontend Entwickler eigentlich tun. Nachdem in den letzten Jahren JavaScript als Frontend-Unterbau an Bedeutung gewonnen hat, ist es notwendig Frontendentwicklung anders zu definieren. [Brad Frost hat eine Aufteilung](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/) in „<span lang="en">Front-of-the-front-end developer</span>“ und „<span lang="en">Back-of-the-front-end developer</span>“ vorgenommen und präzisiert, wie sich die Spezialisierung verteilen kann (an dem ich mich auch im folgenden schamlos bediene).

## Front-of-the-front-end

* Semantisches, valides HTML
* Performantes CSS
* JavaScript als Progressive Enhancement, zur DOM-Manipulation oder für simple Interaktionen
* Gimmicks wie Mikro-Animationen
* Barrierefreiheit
* Cross Browser Testing und Debugging
* Web-Performance, Core Vitals
* Wiederverwendbarkeit und Wartungsfreundlichkeit des Codes
* Komponenten Bibliothek/Design Systeme/Dokumentation des Frontends
* Zusammenarbeit mit Designerïnnen, Backend und Back-of-the-front-end Entwicklerïnnen

## Back-of-the-front-end

* Business Logik
* Verbinden des Frontend mit Datenquellen, Anbindung (oder Bereitstellen) von APIs, (Headless) CMS
* Performance des Logik Codes
* Ende-zu-Ende und ähnliche Tests
* Dev-Ops Themen
* Zusammenarbeit mit Designerïnnen, Backend und Front-of-the-front-end Entwicklerïnnen

## Kein schmaler Grat

Nur weil inzwischen viel Code mit JavaScript (JS) statt PHP, ASP oder anderen „klassischen“ Sprachen geschrieben wird, ist das nicht automatisch die Baustelle der Pixel schubsenden CSS-Magier. Dennoch ist der Übergang nicht scharf definiert, so wie er auch früher nicht so scharf zwischen Front- und Backend-Entwicklung definiert war.

Überlappende Fähigkeiten und Erfahrungen sind wichtig für den Austausch und das Verständnis des Gegenübers. Darum bin ich auch froh über alle (UI/UX-) Designerïnnen, die sich mit HTML und CSS länger als nur während der Ausbildung beschäftigt haben.

Dieser Erfahrungsstand variiert auch von Person zu Person. Ich kann z. B. durchaus Webserver administrieren, Datenbanken planen, oder Logik für grav oder Wordpress Plugins schreiben – aber es gibt Leute, die das viel besser können.

## Was mich von JavaScript fernhält

Die erste Firma die mich für einen Vollzeitjob angestellt hat, war Unister (Ja, diese skandalbehaftete Klitsche aus Leipzig). Ich konnte meine selbst erlernten Fähigkeiten in einem Umfeld auf die Probe stellen, dass Produkte für einem kompetitiven Markt entwickelte. Ich konnte dort dank der Kollegïnnen sehr viel lernen (in Front- und Backend). Web-Performance stand immer ganz weit oben, denn wenn die Seite nicht schnell genug war, könnten die Nutzer frühzeitig abspringen.

Es brannte sich also auch ein, wenig Code, so effizient wie möglich zu schreiben. Das ist schon ohne komplexes JS eine Herausforderung. Ich spezialisierte mich also darauf die manchmal sehr verrückten Layouts effektiv umzusetzen (und ohne den Verstand zu verlieren). Dazu kam noch die Arbeit an Workflows und Tools um weniger Routinearbeiten selbst machen zu müssen (Minifizieren, Validieren, etc.).

Und so oft ich auch versuchte mich intensiver mit JS auseinander zu setzen, fiel es mir schwer mich an die Syntax und die Denkmuster dazu zu gewöhnen. Ich komme mit PHP ganz gut zurecht, auch wenn ich dort auch keine besonders komplexen Dinge anstelle, aber fühle mich in der Sprache deutlich wohler.

## Das Problem mit Frameworks

Ich habe mich schon seit 2008 mit Websites für mobile Geräte und ab 2012 sehr intensiv mit [Responsive Webdesign](http://rwd.sebastianlaube.de/) beschäftigt. Zu der Zeit kam auch das CSS-/Komponenten-Framework Bootstrap auf. Ich merke aber schnell, dass es den Entwicklerïnnen gar nicht mal so viel Freiheit verschaffte wie es behauptete. Außerdem schleppen solche Frameworks immer einen großen Overhead mit und erfordern, dass man den eigentlichen HTML Code mit Attributen vollstopft und so insgesamt die Menge an übertragenen Daten erhöht (Bytes zu sparen Steckt tief in meinen Knochen!).

Auch JS-Framworks haben ähnliche Probleme. Selbst mit Tree-Shaking und Chunking sind die Datenmengen sehr groß. Das ist problematisch, weil im Digital-Entwicklungsland Deutschland eine stabile und schnelle Internetverbindung nicht garantiert ist und zum anderen, weil der Browser all das Verarbeiten muss, da die Logik kaum noch auf dem Server sondern im Client stattfindet.

Während HTML und CSS fehlertolerant sind, kann eine Unachtsamkeit bei der JS-Entwicklung das Fronten komplett aus dem Tritt bringen. Eine Gefahr die mich auch immer vom extensiven Einsatz abgehalten hat.

## Ich kann auch Frameworks!

Dieses Jahr habe ich an mehreren Projekten gearbeitet, deren Frontends auf nuxt.js basierten. Dabei war ich beim ersten Anlauf helfende Hand um Komponenten umzusetzen und den anderen Frontendkollegen so zu unterstützen. Der hatte beschlossen dass wir es mal mit dem CSS Framwork Tailwind probieren sollten. Ich hatte meine Skepsis/Ablehnung frühzeitig bekundet, aber wir wagten das Tänzchen. Ich habe mich bemüht, aber es hat mich immer wieder ausgebremst. CSS hat viele tolle Funktionen, vor allem seit den späten 2010ern. Tailwind wird dem nicht gerecht. Es erfindet eine neue Syntax, kann komplexere CSS Konstrukte kaum abbilden und bricht mit simplen Prinzipien und Best Practices. Diese Herausforderung ist auch an dem Kollegen nicht spurlos vorbei gegangen.

Als wir kurze Zeit später ein ähnliches Projekt begonnen, haben wir die Erfahrungen ausführlich besprochen und sind einen anderen Weg gegangen. Zum einen wurde das CSS aus den Komponenten in eigene Dateien ausgelagert (Besser für die Arbeit mit VS Code) und zum anderen haben wir CSS ohne ein Framework verwandt. In Kombination mit globalem CSS Code der eine Basis wie Reset, wiederkehrenden Klassen und Mikrokomponenten und Variablen bereit stellte.

Mit dem Setup ging die Arbeit wesentlich schneller, der Overhead schrumpfte und der Code wurde schneller. Der Kollege hat die gesamte Back-of-the-front-end Arbeit erledigt und ich hab die Aufsicht für das Markup und das CSS übernommen.

## Maßschneidern

Ich musste kürzlich auch wegen hoher Auslastung der Kollegïnnen bei einem Typo3 Projekt das Frontend übernehmen. Die Dogmen dieses speziellen CMS sind auch ein paar Seiten wert, aber wer bin ich, dass ich mich mit noch einer fanatischen Community anlegen will?

Typo verfolgt einen Page-Builder-Ansatz. Also eine Art verstaubter Baukasten (was Wix, Squarespace und Co inzwischen ganz gut hinbekommen). Wenn man diesen Ansatz bis zu Ende verfolgt und für zig Mögliche Kombinationen vorsorgt, erzeugt man auch einen enormen Overhead und verbrennt Zeit, deren Gegenwert ein Kunde gar nicht ausschöpfen kann. Warum? Weil es diese Komplexität selten braucht.

Ich habe die Optionen massiv reduziert/reduzieren lassen. Es gab ja ein Screendesign, das umrissen hatte, was gehen muss. Wir haben nur die Komponenten gebaut die beauftragt waren, plus ein wenig Spielraum. CSS und HTML spiegeln das wieder. Auch bei Komponenten die eine gewisse Flexibilität benötigen, braucht es nicht hunderte Zeilen für ein Grid-System, sondern es reichen ein paar Modifier und ein wenig CSS Grid Magic. Und um redundanter Code, z. B. wenn man für Modul-Überschriften die mehrerer Komponenten die selben Styles mehrfach in den Modul-CSS-Dateien verwendet, kümmern sich Minifizierungs-Tools.

## Komm zum Punkt

Ich schneidere Anzüge nach Maß für Inhalte und Funktionen eines Projekts. Und wenn ich der Freiheitsstatue einen Regenmantel schneidern soll, mach ich das. Aber ich bin kein Gerüstbauer. Das Gerüst, damit ich überall herankomme muss jemand bauen, der/die Ahnung davon hat, damit ich meinen Job machen kann.

Frontend-Entwicklung ist in den letzten Jahren noch komplexer geworden. Es gibt viele Allrounder, aber wie bei Full-Stack-Entwicklerïnnen gibt es wenige die ein so breites Spektrum voll abdecken können. Die Meisten (vor allem mit vielen Jahren Berufserfahrung) haben Spezialisierungen.

Du kannst drei JS-Cracks (die ihr als Frontend-Entwicklerïnnen bezeichnte) im Team haben, aber wenn keiner richtig gut mit HTML und CSS umgehen kann, springt euch entweder das Design Team aufs Dach, weil ihre Vorstellungen nicht umgesetzt werden können, oder eine (End-)Kundin, weil die Benutzererfahrung mies ist. Bis hin zu rechtlichen Konsequenzen wegen mangelnder Barrierefreiheit bei öffentlichen Einrichtungen.

Liebe Firmen, Liebe Headhunter, anstatt nach dem Einhorn (z. B. Full-Stack-Entwickler) zu suchen, solltet ihr genau hinsehen, was zu tun ist, und zielgerichtet ausschreiben.

Fragt euer Team, was sie brauchen. Wenn ihnen diese Granularität nicht bewusst ist, fehlt ihnen vielleicht auch etwas Erfahrung? In dem Fall benötigen sie erfahrene Entwicklerïnnen, mit denen sie wachsen können. Dieser Fakt ist dann in der Ausschreibung wichtiger als alle Häkchen beim Tech-Stack machen zu können.

Die JS basierten Frontends werden weiter zulegen und ich hoffe, dass immer mehr Firmen die Aufgaben auf spezialisierte Entwicklerïnnen verteilen, statt Heere von Einhörnern aufstellen zu wollen.

!! Wer Rechtschreibfehler findet, kann sie behalten.