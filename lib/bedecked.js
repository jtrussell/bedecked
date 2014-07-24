'use strict';

var path = require('path')
  , fs = require('fs')
  , Mustache = require('mustache')
  , marked = require('marked')
  , jade = require('jade')
  , async = require('async')
  , _ = require('lodash');

var  slideBreakAt = /(?:\r?\n){3,}/;

var getPrezTemplate = function(framework, cb) {
  var tplFilePath = path.join(__dirname, '../assets/tpl/' + framework + '.html.mustache');
  fs.readFile(tplFilePath, function(err, tpl) {
    if(err) { cb(err); }
    cb(null, tpl.toString());
  });
};

var unindent = function(markup) {
  // We'll assume the leading whitespace of the first line should be trimmed
  // from all lines
  var lines = markup.split('\n');
  /^(\s+)/.exec(lines[0]);
  var leadingWhiteSpace = RegExp.$1
    , pattern = new RegExp('^' + leadingWhiteSpace);
  lines = lines.map(function(l) {
    return l.replace(pattern, '');
  });
  return lines.join('\n');
};

var markupToHtml = function(slide, opts) {
  var html
    , markup = slide.preHtml;

  if(slide.indented) {
    markup = unindent(markup);
  }

  if('markdown' === opts.engine) {
    html = require('marked')(markup);
  } else if('jade' === opts.engine) {
    html = require('jade').render(markup);
  } else if('html' === opts.engine) {
    html = markup;
  }
  return html;
};

var optsPrepSlides = function(opts, cb) {
  opts.slides = _.map(opts.slides, function(slide) {
    return {
      html: markupToHtml(slide, opts),
      indented: slide.indented
    };
  });

  var ix, slide;
  
  // Wrap indented slides and direct parents in `section` tags
  for(ix = opts.slides.length; ix--;) {
    slide = opts.slides[ix];
    if(slide.indented && ix) {
      if(!opts.slides[ix-1].indented) {
        // The "parent" slide must be wrapped in a section as well if it has
        // indented children
        opts.slides[ix-1].html = '<section>'+opts.slides[ix-1].html+'</section>';
      }
      slide.html = '<section>'+slide.html+'</section>';
      console.log('found indented slide');
      //opts.slides.splice(ix, 1);
    }
  }

  // Collapse nested slides onto their parents
  for(ix = opts.slides.length; ix--;) {
    slide = opts.slides[ix];
    if(slide.indented && ix) {
      opts.slides[ix-1].html += slide.html;
      opts.slides.splice(ix, 1);
    }
  }

  cb(null, opts);
};

var isIndented = function(chunk) {
  var lines = chunk.split('\n')
    , indented = true;
  lines.forEach(function(l) {
    // Line must be empty of indented
    indented = indented && (!(l.trim().length) || /^\t|  /.test(l));
  });
  return indented;
};

module.exports = function(prezFile, opts, finalCallback) {

  // opts is optional
  if(_.isUndefined(finalCallback)) {
    finalCallback = opts;
    opts = {};
  }

  opts = _.assign({}, require('./opts'), opts);

  opts.slides = [];

  async.waterfall([
    // Get the prez file contents
    function(cb) {
      /**
       * @todo should be able to pass raw markdown contents rather than just
       * path
       */
      fs.readFile(prezFile, cb);
    },

    // Split the prez markup into slides
    function(prezContents, cb) {
      var slideChunksPreTpl = prezContents.toString().split(slideBreakAt);
      _.forEach(slideChunksPreTpl, function(chunk) {
        opts.slides.push({
          preHtml: chunk,
          indented: opts.slides.length && isIndented(chunk)
        });
      });
      cb(null, opts);
    },
    optsPrepSlides,
    function(opts, cb) {
      getPrezTemplate('reveal.js', function(err, tpl) {
        if(err) { throw err; }
        var html = Mustache.render(tpl, opts);
        cb(null, html);
      });
    }
  ], finalCallback);
};
