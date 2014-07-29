'use strict';

var fs = require('fs')
  , path = require('path')
  , _ = require('lodash')
  , defaultOpts = require('./opts');

var rcOpts = {}
  , HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

if(fs.existsSync(path.join(HOME, '.bedeckedrc'))) {
  try {
    rcOpts = JSON.parse(fs.readFileSync(path.join(HOME, '.bedeckedrc')).toString());
  } catch(err) {
    /* Keep calm */
    process.stderr.write('!!! Unable to parse $HOME/.bedeckedrc, is it valid JSON?\n');
  }
}

module.exports = function(program) {
  if(program.args && program.args[0] === 'help') {
    return require('./showHelpFor')(program.args[1]);
  }

  if(!program.args.length) {
    program.help();
  }

  var prezMarkupFile = path.resolve(program.args[0])
    , opts = _.assign({}, defaultOpts, rcOpts, _.pick(program, Object.keys(defaultOpts)));

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
