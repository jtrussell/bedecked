'use strict';

var fs = require('fs');

module.exports = function(option) {
  if(fs.existsSync(__dirname + '/../help/' + option + '.txt')) {
    fs.createReadStream(__dirname + '/../help/' + option + '.txt').pipe(process.stdout);
  } else if(option.indexOf('opt') === 0) {
    fs.createReadStream(__dirname + '/../help/opt.txt').pipe(process.stdout);
  } else {
    console.log('');
    console.log('  Show help for what?');
    console.log('');
  }
};
