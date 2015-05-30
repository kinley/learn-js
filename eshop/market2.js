var exists = function (params, key) {
  return (params !== undefined) && (params[key] !== undefined) && (params[key] !== null);
};

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

var ShopStorage = {
  storage: [],
  currentID: 0,
  getNextID: function () {
    return this.currentID++;
  },
  save: function (shop) {
    this.storage[shop[shop.idAttr]] = shop;
  },
  find: function (key, value) {
    var res = [],
      shop,
      i;

    for (i = 0; i < this.storage.length; i++) {
      shop = this.storage[i];
      if (shop[key] === value) {
        res.push(shop);
      }
    }
    return res;
  },
  findByID: function (value) {
    return this.storage[value];
  }
}; // seems to be singleton

var ShopRepository = {
  storage: ShopStorage,
  save: function (shop) {
    if (!shop.isPersisted()) {
      shop[shop.idAttr] = this.storage.getNextID();
    }
    this.storage.save(shop);
    return shop;
  }
};


// market = new Market();

var shop1 = new Shop({name: "Shop1"});
var shop12 = ShopRepository.save(shop1); // shop1.save();

var shop2 = new Shop({name: "Shop2"});
var shop22 = ShopRepository.save(shop2); // shop2.save();

// market.addShop(shop1);
// market.addShop(shop2);

// product1 = new Product();
// product2 = new Product();
// product3 = new Product(); //absent

// shop1.addProduct(product1, 10); //amount
// shop1.addProduct(product2, 15);
// shop2.addProduct(product2, 5);