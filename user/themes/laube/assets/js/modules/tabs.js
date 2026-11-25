/*
    Progressive enhancement of a list of anchor links + sections into an
    accessible tab interface.
*/

function setup( container, containerIndex )
{
    const tablist = container.querySelector( 'ul.tabs__head' );
    const tabs = [ ...tablist.querySelectorAll( 'a.tabs__toggle' ) ];
    const panels = [ ...container.querySelectorAll( '[id^="tabsection"]' ) ];

    if ( !tabs.length || !panels.length ) return;

    // useful for no-JS fallbacks
    container.classList.add( 'is-interactive' );

    const switchTab = ( oldTab, newTab ) =>
    {
        newTab.focus();
        // make the active tab focusable by the user (Tab key)
        newTab.removeAttribute( 'tabindex' );
        newTab.setAttribute( 'aria-selected', 'true' );
        oldTab.removeAttribute( 'aria-selected' );
        oldTab.setAttribute( 'tabindex', '-1' );

        panels[ tabs.indexOf( oldTab ) ].hidden = true;
        panels[ tabs.indexOf( newTab ) ].hidden = false;
    };

    tablist.setAttribute( 'role', 'tablist' );

    tabs.forEach( ( tab, i ) =>
    {
        tab.setAttribute( 'role', 'tab' );
        tab.setAttribute( 'id', 'tab' + containerIndex + '-' + ( i + 1 ) );
        tab.setAttribute( 'tabindex', '-1' );
        tab.parentNode.setAttribute( 'role', 'presentation' );

        // mouse users
        tab.addEventListener( 'click', e =>
        {
            e.preventDefault();
            const currentTab = tablist.querySelector( '[aria-selected]' );
            if ( e.currentTarget !== currentTab )
            {
                switchTab( currentTab, e.currentTarget );
            }
        });

        // keyboard users
        tab.addEventListener( 'keydown', e =>
        {
            if ( e.key === 'ArrowDown' )
            {
                e.preventDefault();
                panels[ i ].focus();
                return;
            }

            const next = { ArrowLeft: i - 1, ArrowRight: i + 1 }[ e.key ];
            if ( next === undefined ) return;

            e.preventDefault();
            if ( tabs[ next ] )
            {
                switchTab( e.currentTarget, tabs[ next ] );
            }
        });
    });

    panels.forEach( ( panel, i ) =>
    {
        panel.setAttribute( 'role', 'tabpanel' );
        panel.setAttribute( 'tabindex', '-1' );
        panel.setAttribute( 'aria-labelledby', tabs[ i ].id );
        panel.hidden = true;
    });

    // activate the first tab and reveal the first panel
    tabs[0].removeAttribute( 'tabindex' );
    tabs[0].setAttribute( 'aria-selected', 'true' );
    panels[0].hidden = false;
}

export default function init( containers )
{
    containers.forEach( setup );
}
