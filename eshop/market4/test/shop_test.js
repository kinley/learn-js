var helper = require('../functions');
var assert = helper.assert;

var Shop = require('../entities/shop');
var Repository = require('../entities/repository');


var shopRepository = new Repository('Shop');

var shop1 = new Shop({name: "Shop1"});
var shop12 = shopRepository.save(shop1); // shop1.save();

var shop2 = new Shop({name: "Shop2"});
var shop22 = shopRepository.save(shop2); // shop2.save();

assert(shopRepository.count() === 2, '2 shops added to repo');