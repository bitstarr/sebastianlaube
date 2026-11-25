import Parvus from 'parvus';

export default function init()
{
    // one instance handles every gallery on the page, grouped by data-group
    new Parvus({
        hideScrollbar: false,
        selector: '.gallery .link',
    });
}
