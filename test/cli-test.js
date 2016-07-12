/*global describe, it, before, beforeEach */

'use strict';

var join = require('path').join
  , fs = require('fs')
  , f = require('util').format
  , expect = require('chai').expect
  , sinon = require('sinon')
  , cheerio = require('cheerio')
  , cp = require('child_process');

var fxd = join(__dirname, 'fixtures');

describe('cli', function() {
  before(function(done) {
    var proc = cp.exec(f('node ./bin/bedecked %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s > %s',
        join(fxd, '001.md'),
        '--opt-auto-slide 1',
        '--opt-auto-slide-stoppable false',
        '--opt-center false',
        '--opt-controls false',
        '--opt-embedded true',
        '--opt-fragments false',
        '--opt-hide-address-bar false',
        '--opt-history false',
        '--opt-keyboard false',
        '--opt-loop true',
        '--opt-mouse-wheel true',
        '--opt-overview false',
        '--opt-preview-links true',
        '--opt-progress false',
        '--opt-rtl true',
        '--opt-slide-number true',
        '--opt-touch false',
        '--opt-view-distance 7',
        '--opt-background-transition blargus',
        '--opt-help false',
        '--opt-parallax-background-image foobar',
        '--opt-parallax-background-size wowza',
        '--opt-transition slide',
        '--opt-transition-speed fast',
        join(fxd, 'tmp.html')),
        function(error, stdout, stderr) {
          done(error);
        });
  });

  it('should pass along options', function() {
    var $ = cheerio.load(fs.readFileSync(join(fxd, 'tmp.html')).toString())
      , guts = $('script#reveal-init').html();
      var Reveal = {
        initialize: sinon.spy()
      };
      var fn = new Function('Reveal', guts);
      fn(Reveal);

      var match = sinon.match({
        autoSlide: 1,
        autoSlideStoppable: false,
        center: false,
        controls: false,
        embedded: true,
        fragments: false,
        hideAddressBar: false,
        history: false,
        keyboard: false,
        loop: true,
        mouseWheel: true,
        overview: false,
        previewLinks: true,
        progress: false,
        rtl: true,
        slideNumber: true,
        touch: false,
        viewDistance: 7,
        backgroundTransition: 'blargus',
        help: false,
        parallaxBackgroundImage: 'foobar',
        parallaxBackgroundSize: 'wowza',
        transition: 'slide',
        transitionSpeed: 'fast',
      });

      expect(Reveal.initialize.calledWith(match)).to.be.true
  });
  
});
