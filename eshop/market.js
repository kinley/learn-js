function assert(value, desc) {
  var color = value ? "green" : "red";
  console.log('%c' + desc, 'color: ' + color);
  return value;
};

// TODO: incapsulate fields, create setters/getters -> Entity?
// TODO: autoincrement id
// TODO: inheritance tool, classical OOP tools
function Shop(name) { // -> object (data), params -> id_attr
  this.id = 1; /// should be dynamic, generated on saving (Repository)
  this.name = name; // fields shold not be hardcoded

  this.products = []; /// ???? should be collection
}

Shop.prototype.addProduct = function(name, code) {
  var product = new Product(this.id, name, code);
  this.products.push(product);
  return product;
}

// shopID
function Product(shopID, name, code) {
  this.id = 1;
  this.name = name;
  this.shopID = shopID;
  this.code = code;
}

// repository
function findById(id);
function findByName(name);
function findBy(key, value);
// -----------------
function init();
function save();


shop = new Shop("My Shop");

// TODO: implement runTestSuite properly
// TODO: organize code properly
assert(shop.name === "My Shop", "name is set");
assert(shop instanceof Shop, "instance set properly");

assert(shop.products.length === 0, 'no products yet');
product = shop.addProduct('First Product', 'MY123');
assert(shop.products.length === 1, 'first product added');

shop2 = Repo.save(shop); //use immutability

1. Entity -> Shop, Product
2. Repository -> CRUD

function Entity(obj, idAttr = 'id') {
  init: function (obj, idAttr) {
    this = clone(obj);
    this[idAttr] = null;
    return this;
  }

}

Entity.prototype.clone = function (source) {
  var trgt = {};
  for (key in source) {
    if (source.hasOwnProperty(key)) {
      trgt[key] = source[key];
    }
  }
  return trgt;
}