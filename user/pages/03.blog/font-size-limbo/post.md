---
title: 'font-size Limbo'
date: 2024-08-12 13:37
taxonomy:
  category:
    - Webdesign
    - Gedanken
    - Barrierefreiheit
  tag:
    - Browser
    - Responsive Webdesign
---
Ein Punkt aus [Alvaro Montoro's CSS One-Liners Post](https://alvaromontoro.com/blog/68055/ten-css-one-liners-for-almost-every-project) hat mich getriggert.

> Increase the text size
> 
> `body { font-size: 1.25rem; }`
> 
> Let's face reality: *browsers' default 16px font size is small*. Although that may be a personal opinion based on me getting old 😅

Als ich 1998 ins Webdesign gestolpert bin, hatten wir 13 oder 15 Zoll große Röhrenmonitore und eine Auflösung von 1024×768 war schon viel. Eine Schriftgröße von 10 Pixel hart in auf den `<body>` geknallt und alles sah edel aus.

10 Jahre später war Barrierefreiheit ein wichtiger (wenn auch immernoch unterbewerter) Teil der Arbeit und man hat sich dann doch zu 12px hinreißen lassen – wir hatten jetzt ja 19 Zoll Flachbildschirme!

2012/2023 hat Responsive Design noch mal alles umgekrempelt. Wir haben respektiert, dass Leute die Schriftgröße, die fü sie am besten funktioniert, einfach im Browser einstell und nutzen das als Ausgangswert (1em).

Oft fassen die Nutzer/innen diesen Wert nicht an und wir stellten unsere Berechnungen einfach auf 1em=16px um.

Aber die Bildschirme wuchsen immer mehr oder hatten viel feinere Auflösungen. 24 oder 27 Zoll Bildschirme stehen üblicher Weise weiter von den Nutzer/innen weg und damit erscheinen 16px Schriftgröße wieder ganz schön klein.

Auch die sogenannten Retina Displays haben mir Kopfzerbrechen gemacht. Auf einem 13 Zoll Laptop Screen eine Website darzustellen, als sei es ein 24 Zoller hat bei den Kunden und Nutzer/innen für Probleme mit Platznutzung (Ästhetik) und Lesbarkeit geführt. Ich habe damals [Superscale CSS](/blog/superscale-css) entwickelt um die Website einfach zu skalieren.

Oft wird in den Systemeinstellungen auf ein Zoom für das Ganze User Interface des betriebssystems gesetzt, weil die feine Auflösung alles am Laptop oder dem 32 Zoll Ultrawide viel zu klein erscheinen lässt.

Ich merke auch dass ich an meinem 27 Zoll Bildschirm bei vielen Websites trotzdem hinein zoomen muss, um mich nicht nach vorn lehnen zu müssen.

Den Vorschlag von Alvaro würde ich nicht ohne weiteres übernehmen, da ich z. B. auf einem Smartphone so viel Platz verschwenden würde und viele Nutzer/innen wahrscheinlich von der großen Schrift irritiert wären.

Ich setze ab einer betimmten Viewport Größe eine Schriftgröße von `1.2rem`. Aber das muss auch mit Bedacht gemacht werden, weil dann Graubereiche entstehen in denen Media Queries auf einmal wider in einen anderen Bereich fallen…

Sollten Browser vielleicht auf großen Bildschirmen von vorn herein eine höhere Schriftgröße nutzen, wenn der Nutzer/innen nichts anderes festglegen. Oder braucht es eine Informationskampagne um sie darauf aufmerksam zu machen, dass sie ihre Systemeinstellungen prüfen oder doch eine andere Standard-Schriftgröße im Browser festlegen?

Diese Form der Arbeitsplatzergonomie ist halt nicht nur relevant für Behinderte, auch wenn bei Entwicklern oft noch die Idee vorherrscht, dass nur Leute mit Sehproblemen überhaupt solche Einstellungen nutzen.