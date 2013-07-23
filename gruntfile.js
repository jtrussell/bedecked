module.exports = function(grunt) {

  var fs = require('fs')
    , bedecked = require('./lib/bedecked');

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // [todo] jshint, tests [/todo]

    clean: {
      prep: ['.tmp']
    },

    cssmin: {
      prep: {
        files: {
          '.tmp/prez.css': [
            'bower_components/deck.js/core/deck.core.css',
            'bower_components/deck.js/extensions/goto/deck.goto.css',
            'bower_components/deck.js/extensions/menu/deck.menu.css',
            'bower_components/deck.js/extensions/navigation/deck.navigation.css',
            'bower_components/deck.js/extensions/status/deck.status.css',
            'bower_components/deck.js/extensions/hash/deck.hash.css',
            'bower_components/deck.js/extensions/scale/deck.scale.css',
            'bower_components/deck.js/themes/style/web-2.0.css',
            'bower_components/deck.js/themes/transition/horizontal-slide.css'
          ]
        }
      }
    },

    uglify: {
      prez: {
        files: {
          '.tmp/prez.js': [
            'bower_components/deck.js/jquery-1.7.2.min.js',
            'bower_components/deck.js/modernizr.custom.js',
            'bower_components/deck.js/core/deck.core.js',
            'bower_components/deck.js/core/deck.core.js',
            'bower_components/deck.js/extensions/hash/deck.hash.js',
            'bower_components/deck.js/extensions/menu/deck.menu.js',
            'bower_components/deck.js/extensions/goto/deck.goto.js',
            'bower_components/deck.js/extensions/status/deck.status.js',
            'bower_components/deck.js/extensions/navigation/deck.navigation.js',
            'bower_components/deck.js/extensions/scale/deck.scale.js'
          ]
        }
      }
    }

  });

  grunt.registerTask('prepTpl', function() {
    var tpl = grunt.file.read('tpl/grunt-boilerplate.html.mustache')
      , css = grunt.file.read('.tmp/prez.css')
      , js = grunt.file.read('.tmp/prez.js');

    grunt.file.write('.tmp/prez.html.mustache', require('mustache').render(tpl, {
      styles: css,
      scripts: js,
      slides: [
        '{{#slides}}',
        '<section class="slide">',
          '{{{.}}}',
        '</section>',
        '{{/slides}}'
      ].join('')
    }));
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

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('prep', [
    'clean',
    'cssmin',
    'uglify',
    'prepTpl'
  ]);

  // Register task(s)
  grunt.registerTask('default', [
    'prep',
    'prez'
  ]);

};
