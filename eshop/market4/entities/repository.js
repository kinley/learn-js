var Storage = require('./storage');

var Repository = function (type) {
  this.type = type;
  this.storage = Storage;
  this.box = Storage.addBox(type); // TODO: is this solution proper?
};

Repository.prototype.save = function (obj) {
  return this.storage.save(obj, this.type);
};

Repository.prototype.findByID = function (ID) {
  return this.box.get(ID);
};

Repository.prototype.count = function () {
  return this.box.objects.length;
};

Repository.prototype.list = function () {
  return this.box.objects;
};

module.exports = Repository;