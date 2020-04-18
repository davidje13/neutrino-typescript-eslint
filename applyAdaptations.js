const PASS_THROUGH = (x) => x;

function getRuleConfig(rules, ruleName) {
  const rule = rules[ruleName] || ['off'];
  return Array.isArray(rule) ? rule : [rule];
}

function parseAdaptation(ruleName, adaptation) {
  if (typeof adaptation === 'string') {
    return [adaptation, PASS_THROUGH];
  }
  if (typeof adaptation === 'function') {
    return [ruleName, adaptation];
  }
  if (Array.isArray(adaptation)) {
    return [ruleName, () => adaptation];
  }
  throw new Error(`Unknown adaptation type ${adaptation}`);
}

function applyAdaptations(rules, adaptations) {
  const outRules = {};
  for (const ruleName of Object.keys(adaptations)) {
    const config = getRuleConfig(rules, ruleName);
    if (config[0] === 'off') {
      continue;
    }
    const [newRuleName, adapter] = parseAdaptation(ruleName, adaptations[ruleName]);
    if (newRuleName !== ruleName) {
      outRules[ruleName] = ['off'];
      if (rules[newRuleName]) {
        // user-defined typescript rule takes priority
        continue;
      }
    }
    outRules[newRuleName] = adapter(config);
  }
  return outRules;
}

module.exports = applyAdaptations;
