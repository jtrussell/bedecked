/*global describe, it, before, beforeEach */

'use strict';

var join = require('path').join
  , fs = require('fs')
  , expect = require('chai').expect
  , cheerio = require('cheerio')
  , bd = require('../lib/bedecked');

// Fixtures dir
var fxd = join(__dirname, 'fixtures');

describe('bedecked', function() {
  describe('basics', function() {
    var err, $;
    before(function(done) {
      bd(join(fxd, '001.md'), function(e, html) {
        err = e;
        $ = cheerio.load(html);
        done();
      });
    });

    it('should not generate an error', function() {
      expect(err).to.be.empty();
    });

    it('should split into slides', function() {
      expect($('.slides > section').length).to.equal(4);
    });
  });
});

