const { builtinModules } = require('module');
console.log(builtinModules);
const moment   = require('moment');
console.log(moment().format());
for (let i = 0; i < 10; i++) {
    console.log(i);
}