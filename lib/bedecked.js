var thisDir = __dirname
  , path = require('path')
  , bowerDir = require('./bowerDir')()
  , fs = require('fs')
  , Mustache = require('mustache')
  , marked = require('marked')
  , jade = require('jade')
  , async = require('async')
  , _ = require('underscore')
  , minify = require('./minify');

var  slideBreakFlag = /(?:\r?\n){3,}/;

var getPrezTemplate = function(framework, cb) {
  var tplFilePath = path.join(thisDir, '../tpl/' + framework + '.html.mustache');
  fs.readFile(tplFilePath, function(err, tpl) {
    if(err) { cb(err); }
    cb(null, tpl.toString());
  });
};

var applyDefaultPrezOpts = function(opts) {
  return _.defaults(opts, {
    engine: 'markdown',
    core: {
      css: [path.join(bowerDir, 'deck.js/core/deck.core.css')],
      js: [path.join(bowerDir, 'deck.js/core/deck.core.js')]
    },
    cdn: [{
      name: 'jQuery',
      js: ['https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js']
    }],
    vendor: [{
      name: 'modernizr',
      js: [path.join(bowerDir, 'deck.js/modernizr.custom.js')]
    }],
    theme: {
      css: [path.join(bowerDir, 'deck.js/themes/style/web-2.0.css')]
    },
    transition: {
      css: [path.join(bowerDir, 'deck.js/themes/transition/horizontal-slide.css')]
    },
    extensions: [{
      name: 'deck.goto',
      css: [path.join(bowerDir, 'deck.js/extensions/goto/deck.goto.css')],
      js: [path.join(bowerDir, 'deck.js/extensions/goto/deck.goto.js')]
    },{
      name: 'deck.menu',
      css: [path.join(bowerDir, 'deck.js/extensions/menu/deck.menu.css')],
      js: [path.join(bowerDir, 'deck.js/extensions/menu/deck.menu.js')]
    },{
      name: 'deck.navigation',
      css: [path.join(bowerDir, 'deck.js/extensions/navigation/deck.navigation.css')],
      js: [path.join(bowerDir, 'deck.js/extensions/navigation/deck.navigation.js')]
    },{
      name: 'deck.status',
      css: [path.join(bowerDir, 'deck.js/extensions/status/deck.status.css')],
      js: [path.join(bowerDir, 'deck.js/extensions/status/deck.status.js')]
    },{
      name: 'deck.hash',
      css: [path.join(bowerDir, 'deck.js/extensions/hash/deck.hash.css')],
      js: [path.join(bowerDir, 'deck.js/extensions/hash/deck.hash.js')]
    //},{
    //  name: 'deck.scale',
    //  css: [path.join(bowerDir, 'deck.js/extensions/scale/deck.scale.css')],
    //  js: [path.join(bowerDir, 'deck.js/extensions/scale/deck.scale.js')]
    }]
  });
};

var prepOptItem = function(o, cb) {
  var numThingsToPrep = 0;
  if(o.css) { numThingsToPrep++; }
  if(o.js) { numThingsToPrep++; }

  if(!numThingsToPrep) {cb(null);}
  
  var done = _.after(numThingsToPrep, function() {
    cb(null);
  });

  if(o.css) {
    minify.cssFileList(o.css, function(err, minnedCss) {
      if(err) { cb(err); }
      o.css = minnedCss;
      done();
    });
  }

  if(o.js) {
    minify.jsFileList(o.js, function(err, minnedJs) {
      if(err) { cb(err); }
      o.js = minnedJs;
      done();
    });
  }
};

var optsPrepCore = function(opts, cb) {
  prepOptItem(opts.core, function(err) {
    cb(err, opts);
  });
};

var optsPrepTheme = function(opts, cb) {
  prepOptItem(opts.theme, function(err) {
    cb(err, opts);
  });
};

var optsPrepTransition = function(opts, cb) {
  prepOptItem(opts.transition, function(err) {
    cb(err, opts);
  });
};

var optsPrepExtensions = function(opts, cb) {
  async.each(opts.extensions, prepOptItem, function(err) {
    cb(err, opts);
  });
};

var optsPrepCdn = function(opts, cb) {
  cb(null, opts);
};

var optsPrepVendor = function(opts, cb) {
  async.each(opts.vendor, prepOptItem, function(err) {
    cb(err, opts)
  });
};

var optsPrepSlides = function(opts, cb) {
  opts.slides = _.map(opts.slides, function(slide) {
    return {
      html: markupToHtml(slide.preHtml, opts)
    };
  });
  cb(null, opts);
};

var markupToHtml = function(markup, opts) {
  var html;

  if('markdown' === opts.engine) {
    html = require('marked')(markup);
  } else if('jade' === opts.engine) {
    html = require('jade').render(markup);
  } else if('html' === opts.engine) {
    html = markup;
  }

  return html;
};

module.exports = function(prezFile, opts, finalCallback) {

  // opts is optional
  if(_.isUndefined(finalCallback)) {
    finalCallback = opts;
    opts = {};
  }

  opts = applyDefaultPrezOpts(opts);
  opts.slides = [];

  async.waterfall([
    function(cb) {
      fs.readFile(prezFile, cb);
    },
    function(prezFileString, cb) {
      var slideChunksPreTpl = prezFileString.toString().split(slideBreakFlag);
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
    optsPrepCdn,
    optsPrepVendor,
    optsPrepSlides,
    function(opts, cb) {
      getPrezTemplate('deck.js', function(err, tpl) {
        if(err) { throw err; }
        var html = Mustache.render(tpl, opts); 
        cb(null, html);
      });
    }
  ], finalCallback);
};
