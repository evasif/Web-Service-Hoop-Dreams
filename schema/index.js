const enums = require('./enums');
const input = require('./input');
const mutations = require('./mutations');
const queries = require('./queries');
const scalar = require('./scalar');
const types = require('./types');

module.exports = `
  ${enums}
  ${input}
  ${mutations}
  ${queries}
  ${types}
  ${scalar}
`;