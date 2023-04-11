---
title: 'VS Code: Extend emmet for new CSS Properties'
date: 2023-04-11 13:37
taxonomy:
  category:
    - Code
  tag:
    - VS Code
---
Occasionally, browser updates also deliver new features for CSS. Not too long ago, for example, we were gifted with ["logical properties"](https://www.youtube.com/watch?v=cV9JhEV4Ll0). While most emmet shortcuts are now muscle memory, there are no emmet shortcuts for these new properties yet. Therefore, I will briefly explain how we can deliver them in Visual Studio code. 

===

## Not all snippets are created equal

To provide us with the completions, we extend the snippets of emmet. However, these are not the snippets we usually specify. Snippets for emmet do not need to be described so extensively. Here is the difference:

`~/AppData/Roaming/Code/User/snippets/css.json` (example)
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

## The Snippets

As mentioned above, I need completions especially for the logical properties. Instead of `margin-left` that I would preface with `ml`, I now want to type something like `mis` for `margin-inline-start`.

I have published my [snippets.json as gist](https://gist.github.com/bitstarr/9b7ea0208e760bf24ea5534ca33d1c28) and stored it locally under `~/AppData/Roaming/Code/User/emmet/snippets.json`.

To ensure that the snippets are also recognised by VS Code, we write the following in the VS Code settings:

`~/AppData/Roaming/Code/User/settings.json`
```json
    "emmet.extensionsPath": [
        "~/AppData/Roaming/Code/User/emmet/"
    ],
```

VS Code looks in the path for the snippets.json, so specifying the folder is enough.

I wanted the snippets to be in the folder with the settings of VS Code. Under Windows, VS Code interprets `~` like the environment variable `%USERPROFILE%`. On Linux, the path would be `~/.config/Code/User/emmet/` You can also have project-specific snippest (for example `.code/emmet` in the project folder) or store them somewhere else.

VS Code `settings.json`, erweitertes Beispiel
```json
    "emmet.extensionsPath": [
        "~/AppData/Roaming/Code/User/emmet/",
        "~/.config/Code/User/emmet/",
        ".code/emmet/",
        "/usr/share/somefolder-you-like"
    ],
```

## Sources:

* [Extending Emmet and VS Code — and discovering 415 CSS properties](https://dev.to/madsstoumann/extending-emmet-and-vs-code-and-discovering-415-css-properties-1dfo)
* [VS Code Docs: Emmet in Visual Studio Code](https://code.visualstudio.com/docs/editor/emmet#_using-custom-emmet-snippets)