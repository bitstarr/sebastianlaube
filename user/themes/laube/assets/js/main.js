/*
    Entry point. Every module is only downloaded when its selector matches
    something on the current page. Each module default-exports an init
    function that receives the matched elements.
*/

const modules = {
    '.js-details': () => import( './modules/details.js' ),
    '.tabs': () => import( './modules/tabs.js' ),
    '.visualizer button.playpause': () => import( './modules/audio.js' ),
    'iframe[data-src]': () => import( './modules/embedvideo.js' ),
    '.gallery:has(a)': () => import( './modules/gallery.js' ),
    'pre > code': () => import( './modules/code.js' ),
    'dialog.ref-dialog': () => import( './modules/references.js' ),
};

for ( const [ selector, load ] of Object.entries( modules ) )
{
    const elements = document.querySelectorAll( selector );

    if ( elements.length )
    {
        load().then( module => module.default( elements ) );
    }
}
