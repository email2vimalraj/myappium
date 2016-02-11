/**
 * Module dependencies.
 */

var Mocha;
if(module.parent){
  Mocha = module.parent.require('mocha');
}else{
  Mocha = window.Mocha;
}

var Suite = Mocha.Suite
  , Test = Mocha.Test
  , utils = Mocha.utils
  , Args = require('vargs').Constructor;

/**
 * BDD-style interface:
 *
 *      describe('Array', function(){
 *        describe('#indexOf()', {pending: true}, function(){
 *          it('should return -1 when not present', {pending: true} function(){
 *
 *          });
 *
 *          it('should return the index when present', function(){
 *
 *          });
 *        });
 *      });
 *
 */

module.exports = function(suite){
  var suites = [suite];

  suite.on('pre-require', function(context, file, mocha){

    /**
     * Execute before running tests.
     */

    context.before = function(name, fn){
      suites[0].beforeAll(name, fn);
    };

    /**
     * Execute after running tests.
     */

    context.after = function(name, fn){
      suites[0].afterAll(name, fn);
    };

    /**
     * Execute before each test case.
     */

    context.beforeEach = function(name, fn){
      suites[0].beforeEach(name, fn);
    };

    /**
     * Execute after each test case.
     */

    context.afterEach = function(name, fn){
      suites[0].afterEach(name, fn);
    };

    /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */

    context.describe = context.context = function(){
      var args = new Args(arguments);
      var title = args.all[0];
      var opts = args.all[1] || {};
      var fn = args.callback;
      var suite = Suite.create(suites[0], title);
      suite.pending = opts.pending ? true : false;
      suite.file = file;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
      return suite;
    };

    /**
     * Pending describe.
     */

    context.xdescribe =
    context.xcontext =
    context.describe.skip = function(){
      var args = new Args(arguments);
      var title = args.all[0];
      var opts = args.all[1] || {};
      var fn = args.callback;
      var suite = Suite.create(suites[0], title);
      suite.pending = true;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
    };

    /**
     * Exclusive suite.
     */

    context.describe.only = function(){
      var args = new Args(arguments);
      var title = args.all[0];
      var opts = args.all[1] || {};
      var fn = args.callback;
      var suite = context.describe(title, opts, fn);
      mocha.grep(suite.fullTitle());
      return suite;
    };

    /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */

    context.it = context.specify = function(){
      var args = new Args(arguments);
      var title = args.all[0];
      var opts = args.all[1] || {};
      var fn = args.callback;      
      var suite = suites[0];
      if (suite.pending || opts.pending) var fn = null;
      var test = new Test(title, fn);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    /**
     * Exclusive test-case.
     */

    context.it.only = function(){
      var args = new Args(arguments);
      var title = args.all[0];
      var opts = args.all[1] || {};
      var fn = args.callback;      
      var test = context.it(title, opts, fn);
      var reString = '^' + utils.escapeRegexp(test.fullTitle()) + '$';
      mocha.grep(new RegExp(reString));
      return test;
    };

    /**
     * Pending test case.
     */

    context.xit =
    context.xspecify =
    context.it.skip = function(title){
      context.it(title);
    };
  });
};

Mocha.interfaces['bdd-with-opts'] = module.exports;
