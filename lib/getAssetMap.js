'use strict';

var resolve = require('path').resolve
  , join = require('path').join
  , basename = require('path').basename
  , async = require('async');

var getDirAssets = function(dir, cb) {
  var fs = require('fs');
  fs.readdir(dir, function(err, files) {
    if(err) { return cb(err); }
    cb(null, files.filter(function(f) {
      return (/\.css$/).test(f);
    }).map(function(f) {
      return resolve(f);
    }));
  });
};

module.exports = function(asset, cb) {
  var assetDirs = [
    join(require('./vendorDir')(), 'deck.js/themes', asset),
    join(require('./contribDir')(), 'deck.js/themes', asset)
  ];
  
  async.map(assetDirs, getDirAssets, function(err, assetFilesAndFiles) {
    if(err) { return cb(err); }
    
    var assetFiles = [];
    assetFilesAndFiles.forEach(function(files) {
      assetFiles = assetFiles.concat(files);
    });

    var assetMap = {};
    assetFiles.forEach(function(f) {
      assetMap[basename(f, '.css')] = f;
    });
    cb(null, assetMap);
  });
};
