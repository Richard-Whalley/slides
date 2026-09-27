import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';

const deck = new Reveal({
    plugins: [Markdown, Notes]
});

deck.initialize({
    hash: true,
    slideNumber: true,
    width: 1280,
    height: 720,
    margin: 0.04,
    center: false,
    transition: 'fade',
});
