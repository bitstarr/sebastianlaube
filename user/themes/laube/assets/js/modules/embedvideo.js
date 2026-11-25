/*
    Iframes are rendered with data-src instead of src. They are only started
    after the visitor agreed, either once or permanently (stored in localStorage).
*/

const STORAGE_KEY = 'allow_embed';

let frames = [];

const start = frame =>
{
    frame.src = frame.dataset.src;
};

const startAll = () => frames.forEach( start );

function allowAlways()
{
    try
    {
        window.localStorage.setItem( STORAGE_KEY, true );
    }
    catch
    {
        // storage unavailable, consent only lasts for this page view
    }

    frames.forEach( frame =>
    {
        if ( frame.nextElementSibling?.classList.contains( 'embedvideo__privacy' ) )
        {
            frame.nextElementSibling.remove();
        }
    });

    startAll();
}

function showMessage( frame )
{
    const { privacy, once, always } = frames[0].dataset;

    let content = '<p>' + privacy + '</p><p class="buttons"><button class="button" data-action="show_embedded_content">' + once + '</button><button class="button" data-action="show_embedded_content_always">' + always + '</button></p>';

    if ( frame.nextElementSibling?.tagName === 'NOSCRIPT' )
    {
        content += '<p>' + frame.nextElementSibling.innerHTML + '</p>';
    }

    const message = document.createElement( 'div' );
    message.classList.add( 'embedvideo__privacy' );
    message.innerHTML = content;

    message.querySelector( '[data-action="show_embedded_content"]' ).addEventListener( 'click', () =>
    {
        start( frame );
        message.remove();
    });
    message.querySelector( '[data-action="show_embedded_content_always"]' ).addEventListener( 'click', allowAlways );

    frame.insertAdjacentElement( 'afterend', message );
}

function isAllowed()
{
    try
    {
        return Boolean( window.localStorage.getItem( STORAGE_KEY ) );
    }
    catch
    {
        return false;
    }
}

export default function init( elements )
{
    frames = [ ...elements ];

    if ( isAllowed() )
    {
        startAll();
    }
    else
    {
        frames.forEach( showMessage );
    }
}
