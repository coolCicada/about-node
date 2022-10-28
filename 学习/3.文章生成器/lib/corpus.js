import moment from 'moment';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

function saveCorpus(title, article) {
  const outputDir = resolve(resolve(), '..', '..', 'output')
  const time = moment().format('|YYYY-MM-DD|HH:mm:ss');
  const outputFile = resolve(outputDir, `${title}${time}.txt`);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  const text = `${title}\n\n ${article.join('\n   ')}`;
  writeFileSync(outputFile, text);

  return outputFile;
}

function loadCorpus(src) {
  const path = resolve(resolve('.'), src);
  const data = readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(data);
}

export {
  saveCorpus,
  loadCorpus,
}