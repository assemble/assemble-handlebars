require('mocha');
var assert = require('assert');

describe('Init', function() {
  it('initializes the engine', function() {
    var engine = require('../index');
    engine.init({});
    // TODO: Add test with actual options
    assert.equal(typeof engine, 'object');
  });
});

describe('Compile', function() {
  it('creates a template object', function(done) {
    var engine = require('../index');
    engine.compile('{{baz}}', {}, function(err, tmpl) {
      if (err) {
        return done(err);
      }
      assert.equal(typeof tmpl, 'function');
      assert.deepEqual(Object.keys(tmpl), ['_setup', '_child']);
      assert.equal(typeof tmpl._setup, 'function');
      assert.equal(typeof tmpl._child, 'function');
      done();
    });
  });
});

describe('Render', function() {
  it('renders a simple template', function(done) {
    var engine = require('../index');
    engine.compile('{{baz}}', {}, function(err, tmpl) {
      if (err) {
        return done(err);
      }
      engine.render(tmpl, {baz: 'bar'}, function(err, content) {
        if (err) {
          return done(err);
        }
        assert.equal(content, 'bar');
        done();
      });
    });
  });

  // TODO: Fix this tests (the loading of helpers)
  it('renders a template with a helper', function(done) {
    var engine = require('../index');
    engine.init({});
    engine.compile('{{addCommas 2222222}}', {}, function(err, tmpl) {
      if (err) {
        return done(err);
      }
      engine.render(tmpl, {}, function(err, content) {
        if (err) {
          return done(err);
        }
        assert.equal(content, '2,222,222');
        done();
      });
    });
  });
});

describe('Register Function', function() {
  it('Creates a template object', function(done) {
    var engine = require('../index');
    engine.registerFunctions({
      test: function() {
        return 'test';
      }
    });
    engine.compile('{{test}}', {}, function(err, tmpl) {
      if (err) {
        return done(err);
      }
      engine.render(tmpl, {}, function(err, content) {
        if (err) {
          return done(err);
        }
        assert.equal(content, 'test');
        done();
      });
    });
  });
});

describe('Register Partial', function() {
  it('renders a template with a partial', function(done) {
    var engine = require('../index');
    engine.registerPartial('head', 'foo');
    engine.compile('{{>head}} bar', {}, function(err, tmpl) {
      if (err) {
        return done(err);
      }
      engine.render(tmpl, {}, function(err, content) {
        if (err) {
          return done(err);
        }
        assert.equal(content, 'foo bar');
        done();
      });
    });
  });
});
