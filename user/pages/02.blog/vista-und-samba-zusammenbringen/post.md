---
title: Vista und Samba zusammenbringen
date: 17-11-2009 15:00
routes:
  aliases:
    - '/2009/11/vista-und-samba-zusammenbringen'
taxonomy:
  category:
    - Computer
---
Als ich mich mit meinen neuen Laptop mit meinem Server verbinden wollte, um meine Netzwerkresourcen zu nutzen, hat Vista rumgezickt. Für allen, denen es auch so geht, hier die Lösung:

Vista Ultimate / Vista Business

1. Auf Start, dann *Ausführen* klicken bzw. die Tastenkombination Windowstaste+R verwenden
2. Im Eingabefeld secpol.msc eingeben
3. Unter *Lokale Richtlinien*, *Sicherheitsoptionen* Doppelklick auf *Netzwerksicherheit: LAN Manager-Authentifizierungsebene*
4. Den Wert von *nur NTLMv2 Antworten senden* ändern auf `&LM- und NTLM-Antworten senden (NTLMv2-Sitzungssicherheit verwenden, wenn ausgehandelt)`


Vista Home Basic und Vista Home Premium

1. In der Registry den Schlüssel `HKEY_LOCAL_MACHINESYSTEMCurrentControlSetControlLsa` suchen
2. Den Wert für LmCompatibilityLevel von 3 auf 1 ändern

via Google und <a href="http://web.archive.org/web/20100211142351/http://www.winboard.org/forum/vista-netzwerk/55176-netzlaufwerk-und-samba.html">winboard.org</a>.

===