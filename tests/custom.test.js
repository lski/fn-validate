const validator = require('../custom');

test('custom func', () => {

    var test = validator((val) => val == "hello", "a message");

    expect(test("test").length).toBe(1);
    expect(test("hello").length).toBe(0);
    expect(test("test")[0]).toBe("a message");
});