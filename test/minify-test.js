
var join = require('path').join
  , fs = require('fs')
  , expect = require('chai').expect;

var fxd = join(__dirname, 'fixtures');

describe('minify', function() {
  var minify = require('../lib/minify');

  describe('css', function() {
    var cssStringLong = [
          'body {',
          '  background-color: #fff;',
          '}'
        ].join('\n')
      , cssStringShort = 'body{background-color:#fff}';

    it('should minify css strings', function(done) {
      minify.css(cssStringLong, function(err, minnedCss) {
        expect(minnedCss).to.equal(cssStringShort);
        done();
      });
    });

    it('should minify css individual', function(done) {
      minify.cssFile(join(fxd, 'css/1.css'), function(err, minnedCss) {
        expect(minnedCss).to.equal(fs.readFileSync(join(fxd, 'css/1.min.css')).toString().trim());
        done();
      });
    });

    it('should minify lists of css files', function(done) {
      minify.cssFileList([
        join(fxd, 'css/1.css'), join(fxd, 'css/2.css')
      ], function(err, minnedCss) {
        var expected = fs.readFileSync(join(fxd, 'css/1_2.min.css')).toString().trim();
        expect(minnedCss).to.equal(expected);
        done();
      });
    });
  });

  describe('js', function() {
    var jsStringLong = [
          'var foo = function() {',
          '  return 1+1;',
          '};'
        ].join('\n')
      , jsStringShort = 'var foo=function(){return 2};'

    it('should minify js strings', function(done) {
      minify.js(jsStringLong, function(err, minnedJs) {
        expect(minnedJs).to.equal(jsStringShort);
        done();
      });
    });
  });
});
