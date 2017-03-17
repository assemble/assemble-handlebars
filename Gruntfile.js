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
    eslint: {
      src: ['*.js', 'test/*.js']
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

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('default', ['lint', 'test']);
};
