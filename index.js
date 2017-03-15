/*!
 * assemble-handlebars <https://github.com/assemble/assemble-handlebars>
 *
 * Copyright (c) 2013-2017, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var helpers = require('handlebars-helpers');
var handlebars = require('handlebars');

// register built-in helpers
exports.init = function(options, params) {
  options = options || {};
  if (options.handlebars) {
    handlebars = options.handlebars;
  }
  helpers(options);
};

exports.compile = function(str, context, cb) {
  var fn;
  try {
    fn = handlebars.compile(str, context);
  } catch (err) {
    return cb(err);
  }
  cb(null, fn);
};

exports.render = function(template, context, cb) {
  var res;
  try {
    if (typeof template === 'string') {
      template = handlebars.compile(template, context);
    }
    res = template(context);
  } catch (err) {
    return cb(err);
  }
  cb(null, res);
};

exports.registerFunctions = function(fns) {
  fns = fns || {};

  for (var key in fns) {
    if (fns.hasOwnProperty(key)) {
      handlebars.registerHelper(key, fns[key]);
    }
  }
};

exports.registerPartial = function(name, str) {
  try {
    handlebars.registerPartial(name, str);
  } catch (err) {}
};

exports.handlebars = handlebars;
