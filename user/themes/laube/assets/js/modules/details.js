export default function init( collapsibles )
{
    collapsibles.forEach( collapsible =>
    {
        const btn = collapsible.querySelector( 'button' );

        collapsible.dataset.expanded = false;
        btn.setAttribute( 'aria-expanded', false );

        btn.addEventListener( 'click', () =>
        {
            const expanded = btn.getAttribute( 'aria-expanded' ) === 'true';
            btn.setAttribute( 'aria-expanded', !expanded );
            collapsible.dataset.expanded = !expanded;
        });
    });
}
