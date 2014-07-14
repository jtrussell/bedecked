/*global describe, it*/

'use strict';

var join = require('path').join
  , fs = require('fs')
  , expect = require('chai').expect;

// Fixtures dir
var fxd = join(__dirname, 'fixtures')
// Temp dir
  , tmpd = join(__dirname, '.tmp');

// Actual fixture
var fixture = function(path) {
  return fs.readFileSync(join(fxd, path)).toString().trim();
};

describe('bedecked', function() {
  /**
   * @todo Create presentations from markdown files in fixtures folder and
   * actually verify output (using cheerio?)
   */
});

