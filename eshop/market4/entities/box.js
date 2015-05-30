var Box = function (type) {
  this.nextID = 0; // TODO: should be incapsulated
  this.type = type; // TODO: should be incapsulated
  this.objects = []; // TODO: should be incapsulated
};

Box.prototype.getNextID = function () { // TODO:
  return this.nextID++;
};

Box.prototype.create = function (obj) {
  obj.id = this.getNextID(); // TODO: object should have ID setters and getters
  this.objects[obj.id] = obj; // TODO: maybe should be ID() getter
  return obj;
};

Box.prototype.update = function (obj) {
  this.objects[obj.id] = obj;
  return obj;
};

Box.prototype.get = function (id) {
  return this.objects[id];
};

// Box.prototype.delete = function (id) { // TODO: deleting from Array is destroyable
//   var obj = get(id);

// }

Box.prototype.count = function () {
  return this.objects.length;
};

module.exports = Box;