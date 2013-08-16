/*jshint camelcase:false */

exports.css = function(css, cb) {
  cb(null, require('cssmin')(css));
};

exports.cssFile = function(path, cb) {
  require('fs').readFile(path, {encoding: 'utf8'}, function(err, css) {
    return err ? cb(err) : cb(null, exports.css(css));
  });
};

exports.js = function(js, cb) {
  var jsp = require('uglify-js').parser
    , ugg = require('uglify-js').uglify
    , ast = jsp.parse(js);

  ast = ugg.ast_mangle(ast);
  ast = ugg.ast_squeeze(ast);
  cb(null, ugg.gen_code(ast));
};

exports.jsFile = function(path, cb) {
  require('fs').readFile(path, {encoding: 'utf8'}, function(err, js) {
    return err ? cb(err) : cb(null, exports.js(js));
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
    return err ? cb(err) : exports.concat(results, ';', cb);
  });
};

exports.cssFileList = function(arr, cb) {
  require('async').map(arr, exports.cssFile, function(err, results) {
    return err ? cb(err) : exports.concat(results, ';', cb);
  });
};
