var handlebars = require('handlebars');
var helpers = require('helper-lib');
var _ = require('lodash');

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

  var registerFunctions = function(helperFunctions) {
    if(helperFunctions) {
      _.forOwn(helperFunctions, function(fn, key) {
        handlebars.registerHelper(key, fn);
      });
    }
  };

  var registerPartial = function(filename, content) {
    var tmpl;
    try {
      if(typeof content === 'string') {
        tmpl = handlebars.compile(content);
      } else {
        tmpl = content;
      }
      handlebars.registerPartial(filename, tmpl);
    } catch (ex) {}
  };

  // register built-in helpers
  helpers.register(handlebars);

  return {
    compile: compile,
    render: render,
    registerFunctions: registerFunctions,
    registerPartial: registerPartial
  };

};

module.exports = exports = plugin();
