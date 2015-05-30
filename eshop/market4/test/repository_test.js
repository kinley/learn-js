var helper = require('../functions');
var assert = helper.assert;

var Storage = require('../entities/storage');
var Repository = require('../entities/repository');

var shopRepository = new Repository('Shop');
assert(shopRepository.type === 'Shop', 'Shop repo created');
assert(shopRepository.storage === Storage, 'Storage connected');
assert(shopRepository.box === Storage.boxes.Shop, 'Storage box connected');

var shop = shopRepository.save({name: 'Shop0'});
assert(shopRepository.box.objects[shop.id] === shop, 'shop saved to repo');
assert(shopRepository.count() === 1, 'count works properly');