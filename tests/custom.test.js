import { custom } from '../src';

test('custom func', () => {

    var valEqualsHello = custom((val) => val == "hello", "a message");

    expect(valEqualsHello("test").length).toBe(1);
    expect(valEqualsHello("hello").length).toBe(0);
    expect(valEqualsHello("test")[0]).toBe("a message");
});