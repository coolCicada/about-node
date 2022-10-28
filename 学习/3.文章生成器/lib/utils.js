function parseOptions(options = {}) {
  const argv = process.argv;
  
  for (let i = 2; i < argv.length; i++) {
    const cmd = argv[i - 1];
    const value = argv[i];

    if (cmd === '--title') {
      options.title = value;
    } else if (cmd === '--min') {
      options.min = Number(value);
    } else if (cmd === '--max') {
      options.max = Number(value);
    }
  }

  return options;
}

export {
  parseOptions,
}