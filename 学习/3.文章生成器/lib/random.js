export function randomInt(min, max) {
  const p = Math.random();
  return Math.floor(min + (max - min) * p);
}

export function createRandomPicker(arr) {
  arr = [...arr];
  function randomPick() {
    const len = arr.length - 1;
    const index = randomInt(0, len);
    const picked = arr[index];
    [arr[index], arr[len]] = [arr[len], arr[index]];
    return picked;
  }
  randomPick();
  return randomPick;
}

export function sentence(pick, replacer) {
  let ret = pick();
  for (const key in replacer) {
    ret = ret.replace(new RegExp(`{{${key}}}`, 'g'),
      typeof replacer[key] === 'function'
        ? replacer[key]()
        : replacer[key]
      );
  }
  return ret;
}
