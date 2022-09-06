import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createRandomPicker, sentence } from './lib/random.js';

const url = import.meta.url;
const path = resolve(dirname(fileURLToPath(url)), 'corpus/data.json');
readFile(path, (err, data) => {
  if (!err) {
    const jsonStr = data.toString('utf-8');
    getRes(JSON.parse(jsonStr));
  }
  else console.error(err);
});

function getRes(corpus){
  const {
    famous,
    bosh_before,
    bosh,
    said,
    conclude,
    title,
  } = corpus;

  const [
      pickFamous,
      pickBoshBefore,
      pickBosh,
      pickSaid,
      pickConclude,
      pickTitle
  ] = [
    famous,
    bosh_before,
    bosh,
    said,
    conclude,
    title
  ].map((item) => {
    return createRandomPicker(item);
  });

  const r = sentence(pickFamous, { said: pickSaid, conclude: pickConclude });
  const r2 = sentence(pickBosh, { title });
  console.log(r);
  console.log(r2);
}
