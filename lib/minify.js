/*jshint camelcase:false */

exports.css = function(css, cb) {
  cb(null, require('cssmin')(css));
};

exports.cssFile = function(path, cb) {
  require('fs').readFile(path, function(err, css) {
    return err ? cb(err) : exports.css(css.toString(), cb);
  });
};

exports.js = function(js, cb) {
  var minnedJs = require('uglify-js').minify(js, {fromString: true});
  cb(null, minnedJs);
};

exports.jsFile = function(path, cb) {
  require('fs').readFile(path, function(err, js) {
    return err ? cb(err) : exports.js(js.toString(), cb);
  });
};

exports.concat = function(arr, sep, cb) {
  var catted = require('underscore').reduce(arr, function(bulk, next) {
    return bulk + sep + next;
  }, '');
  cb(null, catted);
};

exports.jsFileList = function(arr, cb) {
  require('async').map(arr, exports.jsFile, function(err, results) {

    // eh...
    results = require('underscore').map(results, function(r) {
      return r.code ? r.code : r;
    });

    return err ? cb(err) : exports.concat(results, ';', cb);
  });
};

exports.cssFileList = function(arr, cb) {
  require('async').map(arr, exports.cssFile, function(err, results) {
    return err ? cb(err) : exports.concat(results, ';', cb);
  });
};
