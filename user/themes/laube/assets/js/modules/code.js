/*
    Syntax highlighting via the CSS Custom Highlight API.
    Grammars are split into separate chunks by esbuild and only loaded for the
    languages used on the page (class="language-xyz" or data-language="xyz").
*/

import { highlightAll } from 'microlighter';

export default function init()
{
    // resolved relative to this module, not the page:
    // dist/js/chunks/code-[hash].js → dist/css/microlighter.css
    const link = document.createElement( 'link' );
    link.rel = 'stylesheet';
    link.href = new URL( '../../css/microlighter.css', import.meta.url ).href;
    document.head.append( link );

    highlightAll();

    // re-highlight on demand, e.g. after injecting code blocks
    document.addEventListener( 'syntax-highlight', () => highlightAll() );
}
