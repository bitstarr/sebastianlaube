---
title: 'VS Code: emmet für neue CSS Eigenschaften erweitern'
date: 2023-04-11 13:37
taxonomy:
  category:
    - Code
  tag:
    - VS Code
---
Gelegentlich liefern Browserupdates auch neue Features für CSS. Vor nicht all zu langer Zeit wurden wir z. B. mit [„logical properties“ beschenkt](https://www.youtube.com/watch?v=cV9JhEV4Ll0). Während die meisten Shortcuts von emmet inzwischen Muscle Memory sind, gibt es für diese neuen Eigenschaften noch keine emmet Abkürzungen. Darum will ich hier mal kurz erklären, wie wir sie in Visual Studio Code nachliefern können. 

===

## Snippets sind nicht gleich Snippets

Um uns die Vervollständigungen bereit zu stellen, erweitern wir die Snippets von emmet. Das sind aber nicht die Snippets, die wir sonst so festlegen. Snippets für emmet müssen nicht so umfangreich beschrieben werden. Hier mal der Unterschied:

`~/AppData/Roaming/Code/User/snippets/css.json` (Beispiel)
```json
{
  "var": {
    "prefix": "var",
    "body": [
      "var( --$1 )"
    ],
    "description": "var() shortcut"
  },

  "Breakpoint": {
    "prefix": "bp",
    "body": [
      "@media screen and (min-width: ${1|32em,50em|}) {",
      "\t$0",
      "}"
    ],
    "description": "Create a new min-width media query"
  }
}
```

emmet snippets
```json
{
  "html": {
    "snippets": {
    }
  },
  "css": {
    "snippets": {
      "ar": "aspect-ratio: ${1}",
      "ga": "gap: ${1}",
      …
    }
  }
}
```

## Die Snippets

Wie oben erwähnt, benötige ich vor allem für die logical properties Vervollständigungen. Statt `margin-left`, dass ich mit `ml` einleiten würde, möchte ich nun etwas wie `mis` für `margin-inline-start` tippen.

Ich habe meine [snippets.json als gist](https://gist.github.com/bitstarr/9b7ea0208e760bf24ea5534ca33d1c28) veröffentlicht und lokal unter `~/AppData/Roaming/Code/User/emmet/snippets.json` gespeichert.

Damit die Snippets auch von VS Code erkannt werden, schreiben wir folgendes in die VS Code Einstellungen:

`~/AppData/Roaming/Code/User/settings.json`
```json
    "emmet.extensionsPath": [
        "~/AppData/Roaming/Code/User/emmet/"
    ],
```

VS Code schaut im Pfad nach der snippets.json, darum reicht die Angabe des Ordners.

Ich wollte, dass die Snipptes im Ordner mit den Einstellungen von VS Code liegen. `~` interpretiert VS Code unter Windows wie die Umgebungsvariable `%USERPROFILE%`. Unter Linux wäre der Pfad `~/.config/Code/User/emmet/` Du kannst auch projektabhängige Snippest (zum Beispiel `.code/emmet` im Projekt-Ordner) haben oder sie irgendwo anders speichern.

VS Code `settings.json`, erweitertes Beispiel
```json
    "emmet.extensionsPath": [
        "~/AppData/Roaming/Code/User/emmet/",
        "~/.config/Code/User/emmet/",
        ".code/emmet/",
        "/usr/share/somefolder-you-like"
    ],
```


## Quellen:

* [Extending Emmet and VS Code — and discovering 415 CSS properties](https://dev.to/madsstoumann/extending-emmet-and-vs-code-and-discovering-415-css-properties-1dfo)
* [VS Code Docs: Emmet in Visual Studio Code](https://code.visualstudio.com/docs/editor/emmet#_using-custom-emmet-snippets)