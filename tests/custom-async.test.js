const genericAsync = require('../custom-async');

test('is true - async', (done) => {

    let validator = genericAsync((val) => Promise.resolve(val));
    let result = validator(true);

    expect(result).toBeInstanceOf(Promise);

    result.then(result => {

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(0);
        done();
    });
});

test('is false - async', (done) => {

    let validator = genericAsync((val) => Promise.resolve(val));
    let result = validator(false);

    expect(result).toBeInstanceOf(Promise);

    result.then(result => {

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
        done();
    });
});

test('is true', (done) => {

    let validator = genericAsync(val => val);
    let result = validator(true);

    expect(result).toBeInstanceOf(Promise);

    result.then(result => {

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(0);
        done();
    });
});

test('is false', (done) => {

    let validator = genericAsync(val => val);
    let result = validator(false);

    expect(result).toBeInstanceOf(Promise);

    result.then(result => {

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
        done();
    });
});