/*global describe, it, before, beforeEach */
/*jshint -W030 */
/*jshint -W054 */

'use strict';

var join = require('path').join
  , fs = require('fs')
  , _ = require('lodash')
  , expect = require('chai').expect
  , sinon = require('sinon')
  , cheerio = require('cheerio')
  , bd = require('../lib/bedecked');

// Fixtures dir
var fxd = join(__dirname, 'fixtures');

describe('bedecked', function() {
  describe('api basics', function() {
    var err, $;
    before(function(done) {
      bd(join(fxd, '001.md'), function(e, html) {
        err = e;
        $ = cheerio.load(html);
        done();
      });
    });

    it('should not generate an error', function() {
      expect(err).to.not.be.ok;
    });

    it('should split into slides', function() {
      expect($('.slides > section').length).to.equal(4);
    });

    it('should nest indented slides', function() {
      expect($('.slides > section').eq(2).find('section').length).to.equal(3);
    });

    it('should not leave any mustache templates', function() {
      expect($.html()).to.not.match(/{{[^}]+}}/g);
    });

    it('should add styles and scripts to the page', function() {
      expect($('link#reveal-core').length).to.equal(1);
      expect($('link#reveal-theme').length).to.equal(1);
      expect($('script#reveal-core').length).to.equal(1);
      expect($('script#reveal-init').length).to.equal(1);
    });

    it('should initialize revealjs', function() {
      var guts = $('script#reveal-init').html();
      var Reveal = {
        initialize: sinon.spy()
      };
      var fn = new Function('Reveal', guts);
      fn(Reveal);
      expect(Reveal.initialize.calledOnce).to.be.true;
    });
  });

describe('api custom opts', function() {
  var err, $;

  var bdOpts = {
    engine: 'jade',
    protocol: 'https:',
    revealjsVersion: '3.7.6',
    theme: 'night',
    title: 'Awesome prez',
  };

  var revealOpts = {
    optAutoSlide: 1,
    optAutoSlideStoppable: false,
    optBackgroundTransition: 'convex',
    optCenter: false,
    optControls: false,
    optEmbedded: true,
    optFragments: false,
    optHelp: false,
    optHideAddressBar: false,
    optHistory: true,
    optKeyboard: false,
    optLoop: true,
    optMouseWheel: true,
    optOverview: false,
    optParallaxBackgroundImage: 'http://example.com/foobar.jpg',
    optParallaxBackgroundSize: '200px 400px',
    optPreviewLinks: true,
    optProgress: false,
    optRtl: true,
    optSlideNumber: true,
    optTouch: false,
    optTransition: 'slide',
    optTransitionSpeed: 'fast',
    optViewDistance: 7
  };

  before(function(done) {
    bd(join(fxd, '002.jade'), _.extend({}, bdOpts, revealOpts), function(e, html) {
      err = e;
      $ = cheerio.load(html);
      done();
    });
  });

  it('should pass through options to reaveal.js', function() {
    var guts = $('script#reveal-init').html();
    var Reveal = {
      initialize: sinon.spy()
    };
    var fn = new Function('Reveal', guts);
    fn(Reveal);
    var rOpts = {};
    Object.keys(revealOpts).forEach(function(keyOrig) {
      var key = keyOrig.slice(3);
      key = key.charAt(0).toLowerCase() + key.slice(1);
      rOpts[key] = revealOpts[keyOrig];
    });
    expect(Reveal.initialize.firstCall.args[0]).to.deep.equal(rOpts);
  });
});
});

