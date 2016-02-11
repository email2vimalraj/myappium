"use strict";
/* global describe, it */

var assert = require('assert');

var ENV = {
    BROWSER: 'firefox'
};

function skipIfBrowserIs(browserToSkip) {
    var ret = {
        pending: ENV.BROWSER === browserToSkip
    };
    console.log('ret -->', ret);
    return ret;
}

describe('bdd-with-opts', function(){
  var testCount = 0; 

  it('should be skiped', skipIfBrowserIs('firefox'), function(){
    testCount ++;
    assert(false);
  });

  it('should not be skiped', skipIfBrowserIs('chrome') ,function(){
    testCount ++;
    assert(true);
  });

  it('should have run 1 test' ,function(){
    assert(testCount === 1);
  });

});
