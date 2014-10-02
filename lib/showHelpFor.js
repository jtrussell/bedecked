'use strict';

var fs = require('fs')
  , path = require('path');

var wat = path.join(__dirname, '../help/wat.txt')
  , opt = path.join(__dirname, '../help/opt.txt');

module.exports = function(option) {
  var doc;

  if(option.indexOf('opt-') === 0) {
    doc = opt;
  } else {
    doc = path.join(__dirname, '../help', option + '.txt');
    if(!fs.existsSync(doc)) {
      doc = wat;
    }
  }

  console.log('');
  fs.readFileSync(doc, 'utf8').trim().split('\n').forEach(function(line) {
    console.log('  ' + line.replace(/\s+$/, ''));
  });
  console.log('');
};

