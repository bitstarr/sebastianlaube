export default function init( buttons )
{
    buttons.forEach( button =>
    {
        const player = document.querySelector( 'audio[data-audioid="' + button.dataset.audioid + '"]' );

        if ( !player ) return;

        const setPlaying = playing =>
        {
            button.classList.toggle( 'is-playing', playing );
            button.classList.toggle( 'is-paused', !playing );
        };

        button.addEventListener( 'click', () =>
        {
            if ( player.paused )
            {
                player.play();
                setPlaying( true );
            }
            else
            {
                player.pause();
                setPlaying( false );
            }
        });

        player.addEventListener( 'ended', () => setPlaying( false ) );
    });
}
