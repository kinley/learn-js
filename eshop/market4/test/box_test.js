var helper = require('../functions');
var assert = helper.assert;

var Box = require('../entities/box');

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