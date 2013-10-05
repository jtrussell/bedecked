'use strict';

var path = require('path')
  , assetsDir = require('./assetsDir')();

module.exports = function() {
  return path.join(assetsDir, 'vendor');
};
