module.exports.rules = {
  "no-log-without-message": context =>
    ({ MemberExpression: function(node) {
        if (node.object.name === "log" && node.property.name === "e") {
          context.report(node, `DEBUG: ${JSON.stringify(node)}`);
        }
      }
    }),
};
