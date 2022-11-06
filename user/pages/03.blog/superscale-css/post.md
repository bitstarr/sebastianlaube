---
title: 'superscale.css'
date: 06-11-2022 13:37
taxonomy:
  category:
    - Entwicklung
    - Code
  tag:
    - CSS
    - Frontend
    - Responsive Webdesign
---

Was passiert mit der Website, wenn der Bildschirm richtig groß und richtig hoch aufgelöst ist? Dein Design-Team zuck mit den Achseln und der Kunde meckert über den schmalen Content-Streifen in der Whitespace Prärie?

Spar dir die Diskussion, blas' das Ding oberhalb von FullHD einfach auf – Mit [superscale.css](https://github.com/bitstarr/superscale.css)!

===

## Worum geht's?
Mit Responsive Webdesign sorgen wir dafür dass eine Website auf möglichst vielen Geräten (genauer gesagt Viewports/Bildschirmgrößen) optimal angezeigt wird und den Platz bestmöglich nutzt. Aber es gibt gar nicht so selten die Situation, dass einfach zu viel Platz vorhanden ist. Bildschirme mit 2K (1440p) oder größer zum Beispiel.

Meistens sind die Entwürfe für die größten Bildschirme auf FullHD designt. Aber wie der Platz darüber hinaus genutz wird? Designerïnnen haben oft keine Zeit oder Erfahrung sich damit auseinander zu setzen und die Frontend Entwicklerïnnen sollen es dann richten.

2020 hatte ich keine Lust mehr zu diskutieren und beschloss wir blasen das, was es bei FullHD zu sehen gibt, einfach auf. Wer 27 Zoll und mehr Bildschirmdiagonale hat, sollte eh weit genug weg sitzen und dann bringt den Nutzerïnnen die große Schrift gleich zusätzliche Ergonomie.

## Wie funktioniert's?

```css
:root {
    /* super scale! */
    @media ( min-width: 120.01rem ) {
        font-size: calc( 100vw / 120 );
    }
    /* but not for iOS - it's not smart enough */
    @supports (-webkit-touch-callout: none) {
        font-size: 1rem;
    }
}
```

! Für das Verständnis solltest du den Unterschied zwischen [relativen und absoluten Einheiten in CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units) kennen.

Die Voraussetzungen sind, dass die Basis-Schriftgröße der Website äquivalent zu 16px (Browservoreinstellung Schriftgröße) ist und du verwendest nur relative und schriftbasierte Einheiten. Bei der Basisschriftgröße ist ein FullHD-Viewport (1920 Pixel) 120rem breit.

Um die Skalierung proportional zu halten, wird die `:root` `font-size` auf eine Berechnung eines 120stels von 100vw (100% der Breite des Browserfensters) nach dem Breakpoint von 120rem gesetzt. Nach diesem Punkt wird die Einheit 1rem auf diesen Bruchteil der Viewport-Größe festgelegt.

Schau es dir in Action in [diesen CodePen](https://codepen.io/bitstarr/full/gOwaNoB) an.

## Customization

Wenn du das Design eher oder später fixieren willst, mmusst du die Berechnung ändern. Wenn du zum Beispiel die Skalierung erst bei 2240px Viewport-Breite (bei 1rem=16px) beginnen willst, ersetzt du 120 durch 140. Die Mathematik ist `1920/16 = 120` und `2240/16 = 140`.

## Hinweise

Diese Methode erfordert die Verwendung relativer Einheiten, vorzugsweise Schrifteinheiten (rem, em, ex, ch, ...) und Prozentsätze für praktisch allem! Jede Verwendung von Pixeleinheiten könnte Probleme verursachen.

Auch bestimmte Browser (looking to you, Kalifornische Obstplantage) oder die Art und Weise, wie du mit der Schriftgröße des `html` Elements arbeitest, können herausfordernd werden.

Ich verwende das Snippet seit einigen Jahren in mehreren Projekten und hatte damit kaum Probleme. Beim Testen gab es auch selten Konflikte mit der Einstellung einer abweichenden Schriftgröße für das `body` Element. Die Media Query in `:root` scheint sich an der Browservoreinstellung zu orientieren.

Wenn Nutzerïnnen ihre Standard-Schriftgröße auf 20px einstellen, beginnt die Skalierung möglicherweise eher als erwartet, aber wenn sie diese Schriftgröße absichtlich eingestellt haben, ist das trotzdem unproblematisch. Sie sehen die Seite dann zwar so, als nutzen sie einen kleineren Bildschirm, aber dafür mit einer Schriftgröße, die für sie sehr gut funktioniert.