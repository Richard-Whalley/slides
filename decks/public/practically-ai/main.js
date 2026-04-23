import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import 'reveal.js/plugin/highlight/monokai.css';

const deck = new Reveal({
    plugins: [Markdown, Highlight]
});

deck.initialize({
    hash: true,
    slideNumber: true,
});
