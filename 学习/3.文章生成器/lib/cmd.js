import usage from '../config/usage.js';
import commandLineArgs from 'command-line-args';

const optionDefinitions = [
  { name: 'help'},
  { name: 'title', type: String },
  { name: 'min', type: Number },
  { name: 'max', type: Number},
]

const options = commandLineArgs(optionDefinitions);

if ('help' in options) {
  console.log(usage);
  process.exit();
}

export {
  options
}