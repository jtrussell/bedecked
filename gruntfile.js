module.exports = function(grunt) {
  'use strict';

  var fs = require('fs')
    , bedecked = require('./lib/bedecked');

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: 'gruntfile.js',
      src: 'lib/*.js',
      tests: 'test/*-test.js'
    },

    simplemocha: {
      all: {
        src: 'test/*-test.js'
      }
    },

    watch: {
      test: {
        files: ['lib/*.js', 'test/*-test.js'],
        tasks: ['jshint', 'test']
      }
    },

    bump: {
      options: {
        commitMessage: 'chore: Bump for release (v%VERSION%)',
        files: ['package.json'],
        commitFiles: ['-a'],
        push: false
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', [
    'simplemocha'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);

};
