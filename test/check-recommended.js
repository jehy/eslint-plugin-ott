'use strict';

const {assert} = require('chai');

const { configs} = require('../index');

describe('config', ()=>{
  it('should have my recommended rules', ()=>{
    assert.equal(configs.recommended.rules['no-log-without-message-name'], 2, 'no rule in config');
    assert.equal(configs.recommended.rules['no-process-std'], 2, 'no rule in config');
  });
});
