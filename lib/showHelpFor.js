'use strict';

var path = require('path')
  , fs = require('fs')
  , regDir = path.join(require('./homeDir')(), '.bedecked')
  , contribDir = require('./contribDir')()
  , vendorDir = require('./vendorDir')()
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
  console.log('  serve your generated presentation. While the server is running');
  console.log('  bedecked will watch <file> for changes and perform a live');
  console.log('  reload for all connected bowers windows.');
  console.log('');
  console.log('  Your presentation html will not be written to stdout.');
  console.log('');
};

var readdirFactory = function(dir) {
  return function(cb) {
    fs.readdir(dir, function(err, payload) {
      if(err) {
        if(err.code === 'ENOENT') {
          cb(null, []);
        } else {
          cb(err);
        }
      } else {
        cb(null, payload);
      }
    });
  };
};

var showThemeHelp = function() {
  require('async').parallel([
    readdirFactory(regDir + '/deck.js/themes/style'),
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
    readdirFactory(regDir + '/deck.js/themes/style'),
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

var showSaveThemeHelp = function() {
  console.log('');
  console.log('  Copies a theme file to ~/.bedecked/deck.js/themes/style/ then');
  console.log('  reference that theme like any other by name. Hint: try "help theme"');
  console.log('  after saving your file. This command will overwrite a previously');
  console.log('  saved theme of the same name. You cannot use a name already taken');
  console.log('  by a built in theme.');
  console.log('');
};

var showSaveTransitionHelp = function() {
  console.log('');
  console.log('  Copies a transition file to ~/.bedecked/deck.js/themes/transition/ then');
  console.log('  reference that transition like any other by name. Hint: try "help transition"');
  console.log('  after saving your file. This command will overwrite a previously');
  console.log('  saved transitions of the same name. You cannot use a name already taken');
  console.log('  by a built in transition.');
  console.log('');
};

var showRmThemeHelp = function() {
  console.log('');
  console.log('  Unregisters a previsouly registered theme. You cannot unregister a');
  console.log('  built in theme.');
  console.log('');
};

var showRmTransitionHelp = function() {
  console.log('');
  console.log('  Unregisters a previsouly registered transition. You cannot unregister a');
  console.log('  built in transition.');
  console.log('');
};

helpersMap = {
  engine: showEngineHelp,
  port: showPortHelp,
  server: showServerHelp,
  theme: showThemeHelp,
  transition: showTransitionHelp,
  'save-theme': showSaveThemeHelp,
  'save-transition': showSaveTransitionHelp,
  'rm-theme': showRmThemeHelp,
  'rm-transition': showRmTransitionHelp
};
