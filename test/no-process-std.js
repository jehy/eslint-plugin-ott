/* eslint-disable sonarjs/no-duplicate-string */

'use strict';

const {Linter} = require('eslint');
const chai = require('chai');
const chaiString = require('chai-string');

chai.use(chaiString);
const {assert} = chai;

const {rules} = require('../index');


describe('no-process-std (Rule for checking process stdout and stderr output)', ()=>{
  const linter = new Linter();
  const ruleName = 'no-process-std';
  linter.defineRule(ruleName, rules[ruleName]);

  describe('positive cases', ()=> {
    it('should not throw on fine code', () => {
      const results = linter.verify('var a = 1;var b = "x";', {rules: {[ruleName]: 'error'}});
      assert.equal(results.length, 0, JSON.stringify(results));
    });
  });

  describe('negative cases', ()=> {
    describe('should throw error when using wrong logging', ()=>{

      const wrong = ['process.stdout(shit)', 'process.stderr("shit")', 'process.stdin("shit")', 'process.stderr()'];
      wrong.forEach((message)=>{
        it(`should throw on value ${message}`, ()=>{
          const results = linter.verify(`log.e(${message}, a, b, c);`, { rules: { [ruleName]: 'error' } });
          assert.equal(results.length, 1);
          assert.startsWith(results[0].message, 'Logging should be done via logger, not via process.');
        });
      });
    });
  });
});
