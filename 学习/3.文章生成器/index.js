import { saveCorpus, loadCorpus } from './lib/corpus.js';
import { generate } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';
import { options } from './lib/cmd.js';

const corpus = loadCorpus('corpus/data.json');

const title = options.title || createRandomPicker(corpus.title)();

const article = generate(title, { corpus, ...options });
saveCorpus(title, article);


