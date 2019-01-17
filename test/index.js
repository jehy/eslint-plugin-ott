'use strict';

const {Linter} = require('eslint');
const chai = require('chai');
const chaiString = require('chai-string');

chai.use(chaiString);
const {assert} = chai;

const {rules} = require('../index');

describe('Rule for checking message name in log (no-log-without-message-name)', ()=>{
  const ruleName = 'no-log-without-message-name';
  const linter = new Linter();
  linter.defineRule(ruleName, rules[ruleName]);

  describe('positive cases', ()=> {
    it('should not throw on fine code', () => {
      const results = linter.verify('var a = 1;var b = "x";', {rules: {[ruleName]: 'error'}});
      assert.equal(results.length, 0, JSON.stringify(results));
    });


    describe('should not throw on correct logging', () => {
      const right = ['GOOD', 'good', 'gOoD', 'g.o.o.d', 'G-O-O-D', 'g00d'];
      right.forEach((message)=>{
        it(`should pass on value ${message}`, ()=>{
          const results = linter.verify(`log.e("${message}", a, b, c);`, { rules: { [ruleName]: 'error' } });
          assert.equal(results.length, 0, 'Error should not be thrown here!');
        });
      });
    });
  });

  describe('negative cases', ()=> {
    describe('should throw error when arg is not a literal', ()=>{

      const wrong = ['a', 'a+b', 'func()', '["A"]'];
      wrong.forEach((message)=>{
        it(`should pass on value ${message}`, ()=>{
          const results = linter.verify(`log.e(${message}, a, b, c);`, { rules: { [ruleName]: 'error' } });
          assert.equal(results.length, 1, 'Error should be thrown here!');
          assert.startsWith(results[0].message, 'First logger argument should be literal, got', 'Wrong message');
        });
      });
    });

    describe('should throw error when arg is not alphanumerical with underscore and dot', ()=> {
      const wrong = ['S H I T', '1 2', 'S:H:I:T', 'Так себе'];
      wrong.forEach((message)=>{
        it(`should fail on value ${message}`, ()=>{
          const results = linter.verify(`log.e("${message}", a, b, c);`, { rules: { [ruleName]: 'error' } });
          assert.equal(results.length, 1, 'Error should be thrown here!');
          assert.equal(results[0].message, `First logger argument should be in /^[a-zA-Z0-9-_.]+$/, got "${message}"`, 'Wrong message');
        });
      });
    });
  });
});
