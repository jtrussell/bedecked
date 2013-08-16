var thisDir = __dirname
  , path = require('path')
  , bowerDir = path.join(thisDir, '../bower_components')
  , fs = require('fs')
  , Mustache = require('mustache')
  , marked = require('marked')
  , async = require('async')
  , _ = require('underscore')
  , minify = require('./minify');

var  slideBreakFlag = /(?:\r?\n){3,}/;

var getPrezTemplate = function(framework, cb) {
  var tplFilePath = path.join(thisDir, '../tpl/deck.js.html.mustache');
  fs.readFile(tplFilePath, {encoding: 'utf8'}, function(err, tpl) {
    if(err) { cb(err); }
    cb(null, tpl);
  });
};

var convertMdSlidesToHtml = function(mdChunks, cb) {
  var doBasicMd = function(mdChunk, cb) {
    marked(mdChunk, {}, cb);
  };

  async.map(mdChunks, doBasicMd, cb);
};

var applyDefaultPrezOpts = function(opts) {
  return _.defaults(opts, {
    markup: 'markdown',
    core: {
      css: ['bower_components/deck.js/core/deck.core.css'],
      js: ['bower_components/deck.js/core/deck.core.js']
    },
    vendor: [{
      name: 'jQuery',
      js: ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js']
    },{
      name: 'modernizr',
      js: ['bower_components/deck.js/modernizr.custom.js']
    }],
    theme: {
      css: ['bower_components/deck.js/themes/style/web-2.0.css']
    },
    transition: {
      css: ['bower_components/deck.js/themes/transition/horizontal-slide.css']
    },
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

var optsPrepCore = function(opts, cb) {
  var done = _.after(2, function() {
    cb(null, opts);
  });

  minify.cssFileList(opts.core.css, function(err, minnedCss) {
    if(err) { cb(err); }
    opts.core.css = minnedCss;
    done();
  });

  minify.jsFileList(opts.core.js, function(err, minnedJs) {
    if(err) { cb(err); }
    opts.core.js = minnedJs;
    done();
  });
};

var optsPrepTheme = function(opts, cb) {
  minify.cssFileList(opts.theme.css, function(err, minnedCss) {
    if(err) { cb(err); }
    opts.theme.css = minnedCss;
    cb();
  });
};

var optsPrepTransition = function(opts, cb) {
  minify.cssFileList(opts.transition.css, function(err, minnedCss) {
    if(err) { cb(err); }
    opts.transition.css = minnedCss;
    cb();
  });
};

var optsPrepExtensions = function(opts, cb) {
  async.each(opts.extensions, function(ext, done) {
    // ...
  }, cb);
};

var optsPrepVendor = function(opts, cb) {
  // Vendor files can be linked rather than inlined as they are often large and
  // also hosted on a cdn somewhere
  /*code*/
};

var optsPrepSlides = function(opts, cb) {
  opts.slides = _.map(opts.slides, function(slide) {
    return {
      html: marked(slide.preHtml)
    };
  });
  cb(null, opts);
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
      _.forEach(slideChunksPreTpl, function(chunk) {
        opts.slides.push({
          preHtml: chunk
        });
      });
      cb(null, opts);
    },
    optsPrepCore,
    optsPrepTheme,
    optsPrepTransition,
    optsPrepExtensions,
    optsPrepVendor,
    optsPrepSlides,
    function(opts, cb) {
      getPrezTemplate(function(err, tpl) {
        if(err) { throw err; }
        cb(null, Mustache.render(tpl, opts));
      });
    }
  ], finalCallback);
};
