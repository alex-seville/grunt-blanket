/*
 * grunt-blanket
 * https://github.com/alex-seville/grunt-blanket
 *
 * Copyright (c) 2013 alex-seville
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    

    // Configuration to be run (and then tested).
    blanket: {
      instrument: {
        options: {
          debug: true
        },
        files: {
          'cov/': ['tasks/*.js'],
        },
      }
    },

    

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
 

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint','blanket']);



};
