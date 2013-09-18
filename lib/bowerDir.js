'use strict';

var path = require('path')
  , bowerDir = path.join(__dirname, '../bower_components');
bowerDir = path.normalize(bowerDir);
bowerDir = path.resolve(bowerDir);

module.exports = function() {
  return bowerDir;
};
