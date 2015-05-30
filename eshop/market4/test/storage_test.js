var helper = require('../functions');
var assert = helper.assert;

var Storage = require('../entities/storage');

var boxTest = Storage.addBox('Test');
assert(Storage.boxes.Test === boxTest, 'box created in storage');
var item = Storage.save({}, 'Test'); // TODO: what if type is inside the item?
assert(Storage.boxes.Test.objects[item.id] === item, 'new item added (saved) to storage');
item.newProp = 'newProp';
var item2 = Storage.save(item, 'Test');
assert(item2.newProp === 'newProp', 'object updated');
assert(item.id === item2.id, 'id is the same');