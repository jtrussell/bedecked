
var join = require('path').join
  , fs = require('fs')
  , expect = require('chai').expect;

var fxd = join(__dirname, 'fixtures');

var fixture = function(path) {
  return fs.readFileSync(join(fxd, path)).toString().trim();
};

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

    it('should map an empty string when given empty strings', function(done) {
      minify.css('', function(err, minnedCss) {
        expect(minnedCss).to.equal('');
        done();
      });
    });

    it('should minify individual css files', function(done) {
      minify.cssFile(join(fxd, 'css/1.css'), function(err, minnedCss) {
        expect(minnedCss).to.equal(fixture('css/1.min.css'));
        done();
      });
    });

    it('should minify lists of css files', function(done) {
      var cssFiles = [
        join(fxd, 'css/1.css'), join(fxd, 'css/2.css')
      ];

      minify.cssFileList(cssFiles, function(err, minnedCss) {
        expect(minnedCss).to.equal(fixture('css/1_2.min.css'));
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
      , jsStringShort = 'var foo=function(){return 2};';

    it('should minify js strings', function(done) {
      minify.js(jsStringLong, function(err, minnedJs) {
        expect(minnedJs).to.equal(jsStringShort);
        done();
      });
    });

    it('should map an empty string when given empty strings', function(done) {
      minify.js('', function(err, minnedJs) {
        expect(minnedJs).to.equal('');
        done();
      });
    });

    it('should minify individual js files', function(done) {
      minify.jsFile(join(fxd, 'js/1.js'), function(err, minnedJs) {
        expect(minnedJs).to.equal(fixture('js/1.min.js'));
        done();
      });
    });

    it('should minify lists of js files', function(done) {
      var jsFiles = [
        join(fxd, 'js/1.js'),
        join(fxd, 'js/2.js')
      ];

      minify.jsFileList(jsFiles, function(err, minnedJs) {
        expect(minnedJs).to.equal(fixture('js/1_2.min.js'));
        done();
      });
    });
  });
});
