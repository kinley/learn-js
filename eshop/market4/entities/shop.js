// TODO: this is old shop
var helper = require('../functions');
var exists = helper.exists;

var Shop = function (obj, params) {
  this._object = obj;
  Shop.prototype.clone(this._object, this); // just save initial object, getters just proxied to _object: Adapter, Proxy, Entity...

  this.idAttr = exists(params, 'idAttr') ? params.idAttr : 'id';
  this[this.idAttr] = null;
};

Shop.prototype.idAttr = 'id';
// TODO: add getter for id: some.ID() instead of shop[shop.idAttr]

Shop.prototype.isPersisted = function () {
  return !!this[this.idAttr];
};

Shop.prototype.clone = function (source, trgt) {
  var key;
  for (key in source) {
    if (source.hasOwnProperty(key)) {
      trgt[key] = source[key];
    }
  }
};

Shop.prototype.toString = function () {
  var key,
    str = '';
  for (key in this) {
    if (this.hasOwnProperty(key)) {
      str += key + ': ' + this[key] + ', ';
    }
  }
  return str;
};

module.exports = Shop;