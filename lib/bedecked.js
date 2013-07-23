var thisDir = __dirname
  , fs = require('fs')
  , path = require('path')
  , Mustache = require('mustache')
  , marked = require('marked')
  , async = require('async')
  , _ = require('underscore')
  , slideBreakFlag = /(?:\r?\n){3,}/;

var getPrezTemplate = function(cb) {
  var tplFilePath = path.join(thisDir, '../tpl/boilerplate.html.mustache');
  fs.readFile(tplFilePath, function(err, data) {
    if(err) { cb(err); }
    cb(null, data.toString());
  });
};

var convertMdSlidesToHtml = function(mdChunks, cb) {
  var doBasicMd = function(mdChunk, cb) {
    marked(mdChunk, {}, cb);
  };

  async.map(mdChunks, doBasicMd, cb);
};

var injectSlidesIntoTpl = function(slideContents, finalCallback) {
  var prezValueHash = {
    slides: _.map(slideContents, function(slideHtml) {
      return {slideHtml: slideHtml};
    })
  };

  async.waterfall([
    getPrezTemplate,
    function(prezTpl, cb) {
      cb(null, Mustache.render(prezTpl, prezValueHash));
    }
  ], finalCallback);
};

exports.makePrez = function(markdownContent, finalCallback) {
  async.waterfall([
    function(cb) {
      var mdSlideContents = markdownContent.split(slideBreakFlag);
      cb(null, mdSlideContents);
    },
    convertMdSlidesToHtml,
    injectSlidesIntoTpl
  ], finalCallback);
};

