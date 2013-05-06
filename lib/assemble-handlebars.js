var grunt = require('grunt');
var handlebars = require('handlebars');
var helpers = require('helper-lib');

var plugin = function() {
  'use strict';

  var compile = function(src, options, callback) {
    var tmpl;
    try {
      tmpl = handlebars.compile(src, options);
    } catch(ex) {
      callback(ex, null);
    }
    callback(null, tmpl);
  };

  var render = function(tmpl, options, callback) {
    grunt.verbose.writeln('rendering handlebars');
    grunt.verbose.writeln(require('util').inspect(engine));
    var content;
    try {
      if(typeof tmpl === 'string') {
        tmpl = handlebars.compile(tmpl, options);
      }
      content = tmpl(options);
    } catch (ex) {
      callback(ex, null);
    }
    callback(null, content);
  };

  var registerFunctions = function() {
    helpers.register(handlebars);
  };

  var registerPartial = function(filename, content) {
    var tmpl;
    try {
      tmpl = handlebars.compile(content);
      handlebars.registerPartial(filename, tmpl);
    } catch (ex) {}
  };

  return {
    compile: compile,
    render: render,
    registerFunctions: registerFunctions,
    registerPartial: registerPartial
  };

};

module.exports = exports = plugin();
