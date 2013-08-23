var fs = require('fs')
  , path = require('path')
  , bowerDir = require('./bowerDir')();

module.exports = function(program) {
  var prezMarkupFile = path.resolve(program.args[0]);

  var opts = optsFromProgramArgs(program);
  
  if(program.server) {
    require('./server')(prezMarkupFile, opts);
  } else {
    require('./bedecked')(prezMarkupFile, opts, function(err, html) {
      if(err) { throw err; }
      process.stdout.write(html);
    });
  }
};

var optsFromProgramArgs = function(program) {
  var themeCss
    , transitionCss
    , opts = {};
  
  if(program.theme) {
    themeCss = path.join(bowerDir, 'deck.js/themes/style', program.theme + '.css');
    opts.theme = {
      css: [themeCss]
    };
  }

  if(program.transition) {
    transitionCss = path.join(bowerDir, 'deck.js/themes/transition', program.transition + '.css');
    opts.transition = {
      css: [transitionCss]
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
