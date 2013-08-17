
module.exports = function(program) {

  var prezMarkupFile = require('path').resolve(program.args[0]);

  var opts = {
    // from program...
  };

  require('./bedecked').makePrez(prezMarkupFile, opts, function(html) {
    process.stdout.write(html);
  });
  
};
