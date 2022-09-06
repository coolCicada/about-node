import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const url = import.meta.url;
const path = resolve(dirname(fileURLToPath(url)), 'corpus/data.json');
readFile(path, (err, data) => {
  if (!err) {
    console.log(data.toString('utf-8'));
  }
  else console.error(err);
});