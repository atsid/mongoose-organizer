let chai = require('chai');
let path = require('path');
let expect = chai.expect;

describe("The Mongoose Organizer", () => {
    it('can autowire a new model', () => {
        let User = require('../test/User');
        expect(User).to.be.ok;
    });
});
