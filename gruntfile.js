module.exports = function(grunt) {

  var fs = require('fs')
    , bedecked = require('./lib/bedecked');

  grunt.loadNpmTasks('grunt-contrib-copy');

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dist: {
        files: [
          {expand: true, cwd:'bower_components/deck.js/core/', src: ['**'], dest: 'dist/public/core/'},
          {expand: true, cwd:'bower_components/deck.js/extensions/', src: ['**'], dest: 'dist/public/extensions/'},
          {expand: true, cwd:'bower_components/deck.js/themes/', src: ['**'], dest: 'dist/public/themes/'},
          {expand: true, cwd:'bower_components/deck.js/', src: ['jquery-1.7.2.min.js', 'modernizr.custom.js'], dest: 'dist/public/vendor/'},
          {src:'prez.html', dest: 'dist/public/'}
        ]
      }
    }
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

  grunt.registerTask('dist', [
    'prez',
    'copy'
  ]);

};
