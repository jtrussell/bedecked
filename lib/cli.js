'use strict';

var fs = require('fs')
  , path = require('path')
  , regDir = path.join(require('./homeDir')(), '.bedecked')
  , contribDir = require('./contribDir')()
  , vendorDir = require('./vendorDir')();

var fatalErr = function(msg) {
  console.log('FATAL: ' + msg);
  process.exit();
};

var resolveTheme = function(theme) {
  var themeCss = theme;
  
  if(!fs.existsSync(themeCss)) {
    themeCss = path.join(regDir, 'deck.js/themes/style', theme + '.css');
  }
  
  if(!fs.existsSync(themeCss)) {
    themeCss = path.join(contribDir, 'deck.js/themes/style', theme + '.css');
  }

  if(!fs.existsSync(themeCss)) {
    themeCss = path.join(vendorDir, 'deck.js/themes/style', theme + '.css');
  }

  if(!fs.existsSync(themeCss)) {
    fatalErr('Unrecognized theme: ' + theme);
  }

  return themeCss;
};

var resolveTransition = function(transition) {
  var transitionCss = transition;
  
  if(!fs.existsSync(transitionCss)) {
    transitionCss = path.join(regDir, 'deck.js/themes/transition', transition + '.css');
  }
  
  if(!fs.existsSync(transitionCss)) {
    transitionCss = path.join(contribDir, 'deck.js/themes/transition', transition + '.css');
  }

  if(!fs.existsSync(transitionCss)) {
    transitionCss = path.join(vendorDir, 'deck.js/themes/transition', transition + '.css');
  }

  if(!fs.existsSync(transitionCss)) {
    fatalErr('Unrecognized transition: ' + transition);
  }

  return transitionCss;
};

var saveUserAsset = function(type, file) {
  // ...
}

var rmUserAsset = function(type, name) {
  // ...
}

var optsFromProgramArgs = function(program) {
  var themeCss
    , transitionCss
    , opts = {};

  if(program.theme) {
    opts.theme = {
      css: [resolveTheme(program.theme)]
    };
  }

  if(program.transition) {
    opts.transition = {
      css: [resolveTransition(program.transition)]
    };
  }

  if(program.engine) {
    if(/^(markdown|jade|html)$/.test(program.engine)) {
      opts.engine = program.engine;
    } else {
      console.log('FATAL: Unrecognized templating engine: ' + program.engine);
      process.exit();
    }
  }

  return opts;
};

module.exports = function(program) {
  if(program.args && program.args[0] === 'help') {
    return require('./showHelpFor')(program.args[1]);
  }

  if(program.saveTheme || program.saveTransition) {
    var themeFile = program.saveTheme
      , transFile = program.saveTransition;

    // ... make sure there's an actual file

    saveUserAsset('theme', themeFile);
    saveUserAsset('transition', transFile);
    return;
  }
  
  if(program.rmTheme || program.rmTransition) {
    var themeName = program.rmTheme
      , transName = program.rmTransition;
    
    // ... make sure there's an actual name
    
    rmUserAsset('theme', themeName);
    rmUserAsset('transition', transName);
    return;
  }

  if(!program.args.length) {
    program.help();
  }

  var prezMarkupFile = path.resolve(program.args[0]);

  var opts = optsFromProgramArgs(program);

  if(program.server) {
    var port = program.port || 9090;
    require('./server')(prezMarkupFile, port, opts);
  } else {
    require('./bedecked')(prezMarkupFile, opts, function(err, html) {
      if(err) { throw err; }
      process.stdout.write(html);
    });
  }
};
