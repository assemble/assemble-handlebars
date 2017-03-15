var expect = require('chai').expect;

describe('Init', function() {
  it('initializes the engine', function() {
    var engine = require('../index');
    engine.init({});
    // TODO: Add test with actual options
    expect(typeof engine).to.equal('object');
  });
});

describe('Compile', function() {
  it('creates a template object', function(done) {
    var engine = require('../index');
    engine.compile('{{baz}}', {}, function(err, tmpl) {
      if (err) {
        return done(err);
      }
      expect(typeof tmpl).to.equal('function');
      expect(Object.keys(tmpl)).to.deep.equal(['_setup', '_child']);
      expect(typeof tmpl._setup).to.equal('function');
      expect(typeof tmpl._child).to.equal('function');
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
        expect(content).to.equal('bar');
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
        expect(content).to.equal('2,222,222');
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
        expect(content).to.equal('test');
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
        expect(content).to.equal('foo bar');
        done();
      });
    });
  });
});
