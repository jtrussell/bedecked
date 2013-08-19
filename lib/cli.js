var fs = require('fs')
  , path = require('path')
  , bowerDir = require('./bowerDir')()
  , optsFromProgramArgs;

module.exports = function(program) {
  var prezMarkupFile = path.resolve(program.args[0]);

  optsFromProgramArgs(program, function(opts) {
    require('./bedecked').makePrez(prezMarkupFile, opts, function(err, html) {
      if(err) { throw err; }
      process.stdout.write(html);
    });
  });
};

optsFromProgramArgs = function(program, cb) {
  var themeCss
    , transitionCss
    , opts = {};
  
  if(program.theme) {
    themeCss = path.join(bowerDir, 'deck.js/themes/style', program.theme + '.css');
    if(fs.existsSync(themeCss)) {
      opts.theme = {
        css: [themeCss]
      };
    } else {
      console.log('FATAL: No such theme file: ' + themeCss);
    }
  }

  if(program.transition) {
    transitionCss = path.join(bowerDir, 'deck.js/themes/transition', program.transition + '.css');
    if(fs.existsSync(transitionCss)) {
      opts.transition = {
        css: [transitionCss]
      };
    } else {
      console.log('FATAL: No such transition file exists: ' + transitionCss);
    }
  }

  cb(opts);
};
