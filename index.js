'use strict';

const noLogWithoutMessageName = require('./rules/no-log-without-message-name');
const noProcessStd = require('./rules/no-process-std');

const rules = {
  'no-log-without-message-name': noLogWithoutMessageName,
  'no-process-std': noProcessStd,
};

const configs = { // all rules are recommended on
  recommended: {
    rules: Object.keys(rules)
      .reduce((res, item) => { res[item] = 2; return res; }, {}),
  },
};

module.exports = {rules, configs};
