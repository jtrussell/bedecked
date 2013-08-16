var thisDir = __dirname
  , fs = require('fs')
  , path = require('path')
  , Mustache = require('mustache')
  , marked = require('marked')
  , async = require('async')
  , _ = require('underscore');

var  slideBreakFlag = /(?:\r?\n){3,}/;

var getPrezTemplate = function(cb) {
  var tplFilePath = path.join(thisDir, '../.tmp/prez.html.mustache');
  //var tplFilePath = path.join(thisDir, '../tpl/boilerplate.html.mustache');
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
    slides: slideContents
    //slides: _.map(slideContents, function(slideHtml) {
    //  return {slideHtml: slideHtml};
    //})
  };

  async.waterfall([
    getPrezTemplate,
    function(prezTpl, cb) {
      cb(null, Mustache.render(prezTpl, prezValueHash));
    }
  ], finalCallback);
};

var applyDefaultPrezOpts = function(opts) {
  return _.defaults(opts, {
    markup: 'markdown',
    core: [
      css: ['bower_components/deck.js/core/deck.core.css'],
      js: ['bower_components/deck.js/core/deck.core.js']
    ],
    vendor: [{
      name: 'jQuery',
      js: ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'],
    },{
      name: 'modernizr',
      js: ['bower_components/deck.js/modernizr.custom.js']
    }],
    theme: [
      css: ['bower_components/deck.js/themes/style/web-2.0.css']
    ],
    transition: [
      css: ['bower_components/deck.js/themes/transition/horizontal-slide.css']
    ],
    extensions: [{
      name: 'deck.goto',
      css: ['bower_components/deck.js/extensions/goto/deck.goto.css'],
      js: ['bower_components/deck.js/extensions/goto/deck.goto.js']
    },{
      name: 'deck.menu',
      css: ['bower_components/deck.js/extensions/menu/deck.menu.css'],
      js: ['bower_components/deck.js/extensions/menu/deck.menu.js']
    },{
      name: 'deck.navigation',
      css: ['bower_components/deck.js/extensions/navigation/deck.navigation.css'],
      js: ['bower_components/deck.js/extensions/navigation/deck.navigation.js']
    },{
      name: 'deck.status',
      css: ['bower_components/deck.js/extensions/status/deck.status.css'],
      js: ['bower_components/deck.js/extensions/status/deck.status.js']
    },{
      name: 'deck.hash',
      css: ['bower_components/deck.js/extensions/hash/deck.hash.css'],
      js: ['bower_components/deck.js/extensions/hash/deck.hash.js']
    },{
      name: 'deck.scale',
      css: ['bower_components/deck.js/extensions/scale/deck.scale.css'],
      js: ['bower_components/deck.js/extensions/scale/deck.scale.js']
    }]
  });
};


exports.makePrez = function(prezFile, opts, finalCallback) {

  // opts is optional
  if(_.isUndefined(finalCallback)) {
    finalCallback = opts;
    opts = {};
  }

  opts = applyDefaultPrezOpts(opts);
  opts.slides = [];

  async.waterfall([
    function(cb) {
      fs.readFile(prezFile, {encoding: 'utf8'}, cb);
    },
    function(prezFileString, cb) {
      var slideChunksPreTpl = prezFileString.split(slideBreakFlag);

      // .......

      cb(null, slideChunksPreTpl);
    },
    convertMdSlidesToHtml,
    injectSlidesIntoTpl
  ], finalCallback);
};

