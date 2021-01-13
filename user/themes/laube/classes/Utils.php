<?php
namespace Grav\Theme\Laube;

use Grav\Common\Grav;
use Grav\Common\Filesystem\Folder;

class Utils
{
    function hexToRGB($hex)
    {
        list($r, $g, $b) = sscanf($hex, "#%02x%02x%02x");
        return [$r, $g, $b];
        // {{ laube.hexToRGB('#ffffff') }
    }

    function preloadFonts()
    {
        $grav = Grav::instance();
        $path = $grav['locator']->findResources('theme://dist/fonts/', false );
        $files = Folder::all( $path[0] );
        $links = '';

        foreach( $files as $file )
        {
            if ( preg_match( "/^.*\.(woff|woff2)$/i", $file, $ext ) )
            {
                $url = $path[0] . '/' . $file;
                $links .= '<link rel="preload" href="/' . $url . '" as="font" type="font/' . $ext[1] . '" crossorigin />'. "\n";
            }
        }

        echo $links;
    }

    private $quotes = array(
        "As seen on TV!",
        "From the guy that brought you <a href=\"http://clock.emuman.org\">B-Clock</a>!",
        "From the guy that brought you <a href=\"http://ab-nach-hause.de\">ab-nach-hause.de</a>!",
        "I have only few years left. I don't want to spend them dead.",
        "Featuring gratious alien nudity!",
        "Condemned by the Cyber Pope.",
        "Proudly made on earth.",
        "LIVE from Omicron Persei 8!",
        "Not Y4K compliant.",
        "From the makers of <a href=\"http://bitstarr.org\">bitstarr.org</a>!",
        "From the makers of <a href=\"http://sebastianlaube.de\">sebastianlaube.de</a>!",
        "From the makers of <a href=\"http://ab-nach-hause.de\">ab-nach-hause.de</a>!",
        "Based on a true story.",
        "This website has been modified to fit your primitive screen.",
        "As foretold by Nostradamus.",
        "For external use only.",
        "Torn from tomorrow's headlines!",
        "Federal law prohibits changing the website!",
        "No Humans were probed in the making of this website.",
        "Crafted with luv by monsters.",
        "Scratch here to reveal prize.",
        "Yeti's Choice!",
        "12's Choice!",
        "Soon to be a major religion.",
        "A by-product of the drug industry.",
        "Voted <q>BEST</q>",
        "Too hot for the real world!",
        "Controlling you through a chip in your butt since 1999.",
        "See you on some other channel!",
        "As seen in your dreams!",
        "Thanks for watching, internet slave army!",
        "If you don't read it, someone else will",
        "Made From 100% Recycled Pixels",
        "Tell Your Parents It's Educational",
    );

    function qotm() {
        $i = count($this->quotes) -1;
        echo $this->quotes[rand(0,$i)];
    }
}