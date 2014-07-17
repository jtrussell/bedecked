/*global describe, it, before, beforeEach */
/*jshint -W030 */

'use strict';

var join = require('path').join
  , fs = require('fs')
  , expect = require('chai').expect
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

    it('should add styles and scripts to the page', function() {
      /**
       * @todo
       */
      expect(false).to.be.true;
    });
  });

  describe('api custom opts', function() {
    /**
     * @todo
     */
  });
});

