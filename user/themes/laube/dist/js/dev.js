/*!
 * @copyright Copyright (c) 2013 Sebastian Laube
 * @license   Licensed under MIT license
 *            See https://github.com/bitstarr/ruleemall
 * @version   1.2.0
 */
!function(e,i){"use strict";var n=e.body,t=e.createElement("div");t.id="emMeter",t.style.cssText="position:fixed;bottom:4rem;left:0;z-index:900",t.innerHTML='<div class="display" style="display:inline-block;padding:.4em;font-family:monospace;font-size:.9rem;line-height:1.3;color:#fff;background:#000;background:rgba(0,0,0,.6)">0</div><div class="unit" style="width:5rem;visibility:hidden;">0</div>',n.appendChild(t);var d=t.querySelector(".unit"),r=t.querySelector(".display"),o=d.clientWidth/5;function l(){o=d.clientWidth/5;var e=i.innerWidth/o,n=i.innerHeight/o;e=Math.round(100*e)/100,n=Math.round(100*n)/100,r.innerHTML="W "+e+"em<br/>W "+i.innerWidth+"px<br/>H "+n+"em<br/>H "+i.innerHeight+"px"}l(),i.addEventListener("resize",l,!1)}(document,window);