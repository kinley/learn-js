// TODO: this made only for JSLint. Can be deleted
/*globals assert, exists*/

// ================================================

// ===== BOX =====

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

// ===== TESTING =====

var box1 = new Box('Test');
var box2 = new Box('Test2');
assert(box1.type === 'Test', 'shop type');
assert(box2.type === 'Test2', 'shop type');

assert(box1.nextID === 0, 'init nextID');
box1.getNextID(); // TODO: is it publuc or private method?
assert(box1.nextID === 1, 'inc nextID');
assert(box2.nextID === 0, 'inc nextID');

var obj = box2.create({});
assert(box2.objects[obj.id] === obj, 'new object created in box');
assert(obj.id === 0, 'object id is ok'); // ???
assert(obj.id !== null, 'object id set');
assert(box2.count() === 1, 'objects count works properly');

assert(obj.newProp === undefined, 'object has no newProp');
obj.newProp = 'newProp';
obj = box2.update(obj);
assert(obj.id === 0, 'object id is ok');
assert(obj.newProp === 'newProp', 'object id is ok');
assert(box2.count() === 1, 'objects count works properly');
assert(box2.objects[obj.id] === obj, 'obj is ok');

assert(box2.get(obj.id) === obj, 'get obj');

// ===== BOX-END =====

// ===== STORAGE =====

var Storage = {
  boxes: {},
  addBox: function (type) {
    // TODO: check, if box of this type already exists
    var box = new Box(type);
    this.boxes[type] = box;
    return box;
  },
  save: function (obj, type) { // TODO: rename to save?
    // TODO: check, if box is not created
    var item;
    if (this.isPersisted(obj)) { // TODO: isPersisted is method of object or something else?
      item = this.boxes[type].update(obj);
    } else {
      item = this.boxes[type].create(obj);
    }
    return item;
  },
  isPersisted: function (obj) {
    return obj.id  && obj.id !== null; // TODO: exists
  }
};

// ===== TESTING =====

var boxTest = Storage.addBox('Test');
assert(Storage.boxes.Test === boxTest, 'box created in storage');
var item = Storage.save({}, 'Test'); // TODO: what if type is inside the item?
assert(Storage.boxes.Test.objects[item.id] === item, 'new item added (saved) to storage');
item.newProp = 'newProp';
var item2 = Storage.save(item, 'Test');
assert(item2.newProp === 'newProp', 'object updated');
assert(item.id === item2.id, 'id is the same');

// ===== STORAGE-END =====

// ===== REPOSITORY =====

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

// ===== TESTING =====

var shopRepository = new Repository('Shop');
assert(shopRepository.type === 'Shop', 'Shop repo created');
assert(shopRepository.storage === Storage, 'Storage connected');
assert(shopRepository.box === Storage.boxes.Shop, 'Storage box connected');

var shop = shopRepository.save({name: 'Shop0'});
assert(shopRepository.box.objects[shop.id] === shop, 'shop saved to repo');
assert(shopRepository.count() === 1, 'count works properly');
// var shopList = [shop];
// assert(shopRepository.list() === shopList, 'list all items of repo');

// ===== REPOSITORY-END =====

// ===== ENTITY =====

// ===== TESTING =====

// ===== ENTITY-END =====

// TODO: this is old shop

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

// ===== TESTING =====

var shop1 = new Shop({name: "Shop1"});
var shop12 = shopRepository.save(shop1); // shop1.save();

var shop2 = new Shop({name: "Shop2"});
var shop22 = shopRepository.save(shop2); // shop2.save();

assert(shopRepository.count() === 3, '3 shops added to repo');