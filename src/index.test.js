let chai = require('chai');
let path = require('path');
let expect = chai.expect;

describe("The Mongoose Organizer", () => {
    it('can autowire a new model', () => {
        let User = require('../test/User');
        expect(User).to.exist.and.to.be.a.function;
        expect(User.modelName).to.equal("User");
        expect(User.schema.methods.isValidPassword).to.be.a.function;
        expect(User.schema.virtuals.emailReverse.path).to.equal('emailReverse');
    });
});
