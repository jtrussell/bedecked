'use strict';

var fs = require('fs')
  , vendorDir = require('./vendorDir')()
  , contribDir = require('./contribDir')()
  , helpersMap;

var contribStyleDir
  , vendorStyleDir;

var contribTransDir
  , vendorTransDir;

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

var readdirFactory = function(dir) {
  return function(cb) {
    fs.readdir(dir, cb);
  };
};

var showThemeHelp = function() {
  require('async').parallel([
    readdirFactory(contribDir + '/deck.js/themes/style'),
    readdirFactory(vendorDir + '/deck.js/themes/style')
  ], function(err, themesAndThemes) {
    if(err) {
      console.log(err);
      console.log('Boo! Could not get themes (something went horribly wrong).');
    } else {
      console.log('');
      console.log('  Available themes:');
      console.log('');

      themesAndThemes.forEach(function(themes) {
        themes.forEach(function(f) {
          if(/\.css$/.test(f)) {
            console.log('    - ' + f.replace('.css',''));
          }
        });
      });
    }
  });
};

var showTransitionHelp = function() {
  require('async').parallel([
    readdirFactory(contribDir + '/deck.js/themes/transition'),
    readdirFactory(vendorDir + '/deck.js/themes/transition')
  ], function(err, transAndTrans) {
    if(err) {
      console.log(err);
      console.log('Boo! Could not get transitions (something went horrible wrong).');
    } else {
      console.log('');
      console.log('  Available transitions:');
      console.log('');

      transAndTrans.forEach(function(trans) {
        trans.forEach(function(f) {
          if(/\.css$/.test(f)) {
            console.log('    - ' + f.replace('.css',''));
          }
        });
      });
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
