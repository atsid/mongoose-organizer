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

    it('can autowire a new model with a minimal configuration', () => {
        let User = require('../test/MinimalUser');
        expect(User).to.exist.and.to.be.a.function;
        expect(User.modelName).to.equal("MinimalUser");
    });

    it('can model with a minimal configuration', () => {
        let User = require('../test/MinimalUser');
        expect(User).to.exist.and.to.be.a.function;
        expect(User.modelName).to.equal("MinimalUser");
    });

    it('can accept a mongoose connection as a parameter', () => {
        let mongoose = require('mongoose').createConnection();
        let User = require('../test/User2')(mongoose);
        expect(User).to.exist.and.to.be.a.function;
        expect(User.modelName).to.equal("User");
    })
});
