'use strict';

function noProcessStd(context) {
  return ({
    MemberExpression(node) {
      if (node.object.name !== 'process')
      {
        return;
      }
      if (!(node.property.name === 'stderr' || node.property.name === 'stdout' || node.property.name === 'stdin')) {
        return;
      }
      context.report(node, `Logging should be done via logger, not via process.${node.property.name}`);
    },
  });
}

module.exports = noProcessStd;
