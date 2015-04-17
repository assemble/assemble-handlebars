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
      all: ['*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};
