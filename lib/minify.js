/*jshint camelcase:false */

exports.css = function(css, cb) {
  //cb(null, css);
  cb(null, require('cssmin')(css).toString().trim());
};

exports.cssFile = function(path, cb) {
  require('fs').readFile(path, function(err, css) {
    return err ? cb(err) : exports.css(css.toString(), cb);
  });
};

exports.js = function(js, cb) {
  var minnedJs = require('uglify-js').minify(js, {fromString: true});
  if(minnedJs.code) {
    minnedJs = minnedJs.code;
  }
  cb(null, minnedJs.toString().trim());
};

exports.jsFile = function(path, cb) {
  require('fs').readFile(path, function(err, js) {
    return err ? cb(err) : exports.js(js.toString(), cb);
  });
};

var concat = function(arr, sep, cb) {
  var first = arr.shift() || '';

  var catted = require('lodash').reduce(arr, function(bulk, next) {
    return bulk + sep + next;
  }, first);

  cb(null, catted);
};

exports.jsFileList = function(arr, cb) {
  require('async').map(arr, exports.jsFile, function(err, results) {
    return err ? cb(err) : concat(results, '\n', cb);
  });
};

exports.cssFileList = function(arr, cb) {
  require('async').map(arr, exports.cssFile, function(err, results) {
    return err ? cb(err) : concat(results, '\n', cb);
  });
};
