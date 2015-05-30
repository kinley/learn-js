var Box = require('./box');

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

module.exports = Storage;