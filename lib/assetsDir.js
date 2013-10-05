'use strict';

var path = require('path')
  , assetsDir = path.join(__dirname, '../assets');
assetsDir = path.normalize(assetsDir);
assetsDir = path.resolve(assetsDir);

module.exports = function() {
  return assetsDir;
};
