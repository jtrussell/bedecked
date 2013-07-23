module.exports = function(grunt) {

  var fs = require('fs')
    , bedecked = require('./lib/bedecked');

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    // [todo] jshint, tests [/todo]
  });

  grunt.registerTask('prez', function() {
    var done = this.async()
      , prezMd = grunt.file.read('prez.md');

    bedecked.makePrez(prezMd, function(err, prezHtml) {
      grunt.file.write('prez.html', prezHtml);
      grunt.log.ok('prez.html written!');
      done();
    });
  });

  // Register task(s)
  grunt.registerTask('default', [
    'prez'
  ]);

};
