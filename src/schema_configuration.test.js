let chai = require('chai');
let path = require('path');
let expect = chai.expect;
let SchemaConfiguration = require('./schema_configuration');

describe('The schema configuration class', () => {
   it('will throw if constructed without a raw config object', () => {
       expect(() => new SchemaConfiguration()).to.throw();
   });

    it("populates the name property with the raw config object's name", () => {
        let config = new SchemaConfiguration({name: 'Derp'});
        expect(config.name).to.equal('Derp');
    });

    it('can detect an explicit configuration value', () => {
        let config = new SchemaConfiguration({
            name: 'Derp',
            definition: {
                herp: 'derp'
            }
        });

        expect(config.definition.herp).to.equal('derp');
    });

    it('can detect a path-referenced configuration value', () => {
        let config = new SchemaConfiguration({
            name: 'Derp',
            definitionPath: path.join(__dirname, '../test/definition.trivial')
        });
        expect(config.definition.herp).to.equal('derp');
    });
});