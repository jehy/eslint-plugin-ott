'use strict';

const regexp = /^[a-zA-Z0-9-_.]+$/;

module.exports.rules = {
  'no-log-without-message': context => ({
    MemberExpression(node) {
      if (node.object.name === 'log' && node.property.name === 'e') {
        if (!node.parent.arguments || !node.parent.arguments[0])
        {
          return;
        }
        const {type, value} = node.parent.arguments[0];
        if (type !== 'Literal')
        {
          context.report(node, `First loggger argument should be literal, got ${type}`);
          return;
        }
        if (!regexp.test(value))
        {
          context.report(node, `First loggger argument should be english alphanumeric with underscore, got "${value}"`);
        }
      }
    },
  }),
};
