'use strict';

var fs = require('fs')
  , join = require('path').join
  , bowerDir = require('../lib/bowerDir')()
  , styleDir = join(bowerDir, 'deck.js/themes/style')
  , transDir = join(bowerDir, 'deck.js/themes/transition')
  , helpersMap;

module.exports = function(option) {
  if(helpersMap.hasOwnProperty(option)) {
    helpersMap[option]();
  } else {
    console.log('Show help for what?');
  }
};

var showEngineHelp = function() {
  console.log('');
  console.log('  Available templating engines:');
  console.log('');
  console.log('    - markdown');
  console.log('    - jade');
  console.log('    - html');
  console.log('');
};

var showPortHelp = function() {
  console.log('');
  console.log('  Specify a port for the active development server to listen on.');
  console.log('');
  console.log('  Defaults to 8080.');
  console.log('');
};

var showServerHelp = function() {
  console.log('');
  console.log('  Use this flag to start a connect server from which bedecked will');
  console.log('  serve your generated prezentation. While the server is running');
  console.log('  bedecked will watch <file> for changes and perform a live');
  console.log('  reload for all connected bowers windows.');
  console.log('');
  console.log('  Your presentation html will not be written to stdout.');
  console.log('');
};

var showThemeHelp = function() {
  fs.readdir(styleDir, function(err, files) {
    if(err) { throw err; }
    if(!files.length) {
      console.log('Hmm... there do not seem to be any theme style files...');
    } else {
      console.log('');
      console.log('  Available themes:');
      console.log('');
      files.forEach(function(f) {
        if(/\.css$/.test(f)) {
          console.log('    - ' + f.replace('.css',''));
        }
      });
      console.log('');
    }
  });
};

var showTransitionHelp = function() {
  fs.readdir(transDir, function(err, files) {
    if(err) { throw err; }
    if(!files.length) {
      console.log('Hmm... there do not seem to be any transition files...');
    } else {
      console.log('');
      console.log('  Available transitions:');
      console.log('');
      files.forEach(function(f) {
        if(/\.css$/.test(f)) {
          console.log('    - ' + f.replace('.css',''));
        }
      });
      console.log('');
    }
  });
};

helpersMap = {
  engine: showEngineHelp,
  port: showPortHelp,
  server: showServerHelp,
  theme: showThemeHelp,
  transition: showTransitionHelp
};
