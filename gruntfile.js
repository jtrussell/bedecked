module.exports = function(grunt) {

  var fs = require('fs')
    , bedecked = require('./lib/bedecked');

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    simplemocha: {
      all: {
        src: 'test/*-test.js'
      }
    }, 

    watch: {
      test: {
        files: ['lib/*.js', 'test/*-test.js'],
        tasks: ['test']
      }
    }

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', [
    'simplemocha'
  ]);

  grunt.registerTask('default', [
    'test'
  ]);

};
