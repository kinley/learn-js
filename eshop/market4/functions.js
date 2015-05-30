function assert(value, desc) {
  console.log(value + ': ' + desc);
  return value;
}

var exists = function (params, key) {
  return (params !== undefined) && (params[key] !== undefined) && (params[key] !== null);
};

module.exports.assert = assert;
module.exports.exists = exists;