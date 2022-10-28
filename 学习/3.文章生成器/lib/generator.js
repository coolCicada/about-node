import { randomInt, createRandomPicker, sentence } from './random.js';

export function generate(title, {
  corpus,
  min = 6000,
  max = 10000,
} = {}) {
  const articleLength = randomInt(min, max);

  const { famous, bosh_before, bosh, said, conclude, } = corpus;
  const [ pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude, pickTitle ] = [ famous, bosh_before, bosh, said, conclude, title ].map((item) => {
    return createRandomPicker(item); 
  });
  
  const article = [];
  let totalLength = 0;
  
  while (totalLength < articleLength) {
    let section = '';
    const sectionLength = randomInt(200, 500);
    while (section.length < sectionLength || !/[。？]$/.test(section)) {
      const n = randomInt(0, 100);
      if (n < 20) {
        section += sentence(pickFamous, { said: pickSaid, conclude: pickConclude });
      } else if (n < 50) {
        section += sentence(pickBoshBefore, { title }) + sentence(pickBosh, { title });
      } else {
        section += sentence(pickBosh, { title });
      }
    }
    totalLength += section.length;
    article.push(section);
  }

  return article;
}
