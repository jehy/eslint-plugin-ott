'use strict';

const regexp = /^[a-zA-Z0-9-_.]+$/;

function noLogWithoutMessageName(context) {
  return ({
    MemberExpression(node) {
      if (node.object.name !== 'log' || node.property.name !== 'e') {
        return;
      }
      /* istanbul ignore next */
      if (!node.parent || !node.parent.arguments || !node.parent.arguments[0])
      {
        return;
      }
      const {type, value} = node.parent.arguments[0];
      if (type !== 'Literal')
      {
        context.report(node, `First logger argument should be literal, got ${type}`);
        return;
      }
      if (!regexp.test(value))
      {
        context.report(node, `First logger argument should be in ${regexp.toString()}, got "${value}"`);
      }
    },
  });
}

const rules = {
  'no-log-without-message-name': noLogWithoutMessageName,
};

const configs = {
  recommended: {
    rules: Object.keys(rules)
      .reduce((res, item) => { res[item] = 2; return res; }, {}),
  },
};

module.exports = {rules, configs};
