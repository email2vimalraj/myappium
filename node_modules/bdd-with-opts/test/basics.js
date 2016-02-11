"use strict";
var assert = require('assert');

/* global describe, it */
describe('bdd-with-opts', function(){
  var testCount = 0;

  it('should be skiped', {pending: true}, function(){
    testCount ++;
    assert(false);
  });

  it('should not be skiped', function(){
    testCount ++;
    assert(true);
  });

  it('should have run 1 test' ,function(){
    assert(testCount === 1);
  });

});
