/*!
 * assemble-handlebars <https://github.com/assemble/assemble-handlebars>
 *
 * Copyright (c) 2013-2015, Brian Woodward.
 * Licensed under the MIT License.
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['*.js', 'test/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    mochaTest: {
      tests: {
        options: {
          reporter: 'progress'
        },
        src: ['test/**/*_test.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['jshint', 'test']);
};
