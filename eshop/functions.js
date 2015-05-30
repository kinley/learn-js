function assert(value, desc) {
  var color = value ? "green" : "red";
  console.log('%c' + desc, 'color: ' + color);
  return value;
}

var exists = function (params, key) {
  return (params !== undefined) && (params[key] !== undefined) && (params[key] !== null);
};