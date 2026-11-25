/*
    Opening and closing works without JS through invoker commands
    (commandfor/command). This module only improves navigation:

    - prev/next closes the current dialog before the next one opens,
      so dialogs don't stack up (one Esc closes everything)
    - focus stays on the prev/next button that was used
    - on final close, focus returns to the card of the reference shown last
    - arrow keys left/right navigate
    - backdrop click closes in browsers without closedby="any"
*/

export default function init( dialogs )
{
    const supportsClosedBy = 'closedBy' in HTMLDialogElement.prototype;

    dialogs.forEach( dialog =>
    {
        let navUsed = null;

        // fires on the target dialog *before* it opens
        dialog.addEventListener( 'command', event =>
        {
            if ( event.command !== 'show-modal' ) return;

            navUsed = event.source?.dataset.nav ?? null;

            dialogs.forEach( other =>
            {
                if ( other !== dialog && other.open ) other.close();
            });
        });

        dialog.addEventListener( 'toggle', event =>
        {
            if ( event.newState !== 'open' || !navUsed ) return;

            dialog.querySelector( `[data-nav="${ navUsed }"]` )?.focus();
            navUsed = null;
        });

        dialog.addEventListener( 'close', () =>
        {
            // still navigating
            if ( [ ...dialogs ].some( other => other.open ) ) return;

            document.getElementById( `${ dialog.id }-open` )?.focus();
        });

        dialog.addEventListener( 'keydown', event =>
        {
            if ( event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ) return;

            const nav = { ArrowLeft: 'prev', ArrowRight: 'next' }[ event.key ];

            if ( nav )
            {
                event.preventDefault();
                dialog.querySelector( `[data-nav="${ nav }"]` )?.click();
            }
        });

        if ( !supportsClosedBy )
        {
            // the dialog itself has no padding, so this is only true on the backdrop
            dialog.addEventListener( 'click', event =>
            {
                if ( event.target === dialog ) dialog.close();
            });
        }
    });
}
