'use strict';

var path = require('path');

var optsFromProgramArgs = function(program) {
  var themeCss
    , transitionCss
    , opts = {};

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
