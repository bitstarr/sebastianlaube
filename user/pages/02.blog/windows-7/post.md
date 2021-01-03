---
title: Windows 7
date: 30-11-2009 15:50
routes:
  aliases:
    - '/2009/11/windows-7'
taxonomy:
  category:
    - Computer
---
Das einzige Betriebsystem, bei dem Upgrades wirklich funktionieren ist bekanntermaßen Debian. Das hat sich auch beim Vista zu 7 Upgrade gezeigt… Vorher noch Sachen deinstallieren, die dann nicht mehr gehen und Daten sichern nicht vergessen, die Chancen standen gut, dass alles schief geht.

Naja, Microsofts Virtual PC konnte ich wieder installieren. Dass Daemon Tools nicht mehr geht, nehm ich Windows 7 übel… Mit dem Virtaul CloneDrive  bietet sich zwar passender Ersatz, aber es ist nicht das Selbe…

Außerdem ist es ganz schöne Frimelei, Winows 7 gut aussehen zu lassen. Bei Vista konnte man mittels TuneUp noch Visuelle Stile anwenden und damit dem ganzen Teil eine optische Aufwertung verpassen. Bei 7 kann das TuneUp nicht mehr und man muss von Hand patchen. Außerdem habe ich noch keinen Weg gefunden, diese hässliche und überdimensionierte Orb – früher bekannt als Start Button – zu entsorgen.

Einen netten <a href="http://web.archive.org/web/20100211142351/http://www.winsupportforum.de/forum/windows-7-allgemein/6639-taskbar-vorschau-abschalten.html">Bugfix</a> habe ich noch für diese überflüssige Fenstervorschau der Taskleiste gefunden:

<blockquote cite="http://www.winsupportforum.de/forum/windows-7-allgemein/6639-taskbar-vorschau-abschalten.html">HKEY_CURRENT_USERSoftwareMicrosoftWindowsCurrentVersionExplorerAdvanced</blockquote>

Hierfür erstellt man einen DWORD-Wert `ExtendedUIHoverTime`.

<blockquote cite="http://www.winsupportforum.de/forum/windows-7-allgemein/6639-taskbar-vorschau-abschalten.html">Mit z.B. (dezimal!) 30000 (Millisekunden) was dann also 30 Sekunden entspricht. Bedeutet: der Mauszeiger muss erstmal diese 30 Sekunden über der Schaltfläche stehen, bevor die Miniaturansicht eingeblendet wird.</blockquote>

===