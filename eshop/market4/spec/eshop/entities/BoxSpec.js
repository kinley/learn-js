/*global beforeEach, afterEach */
/*global describe, it, expect */
/*global window, eb, loadFixtures */

describe("Box", function () {
  var Box = require('../../../entities/Box');
  // var box;

  // beforeEarch(function() {
  //   box = new Box();
  // });

  it("should create 2 different boxes", function () {
    var box1 = new Box('Test1');
    var box2 = new Box('Test2');
    expect(box1).not.toEqual(box2);
    expect(box1.type).toEqual('Test1');
    expect(box2.type).toEqual('Test2');
  });
});