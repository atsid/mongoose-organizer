'use strict';
var _ = require('lodash'),
    mongoose = require('mongoose'),
    debug = require('debug')('application:persistence'),
    SchemaConfiguration = require('./schema_configuration'),
    path = require('path');

module.exports = {
    /**
     * Creates a schema using the given configuration object.
     */
    makeSchema (conf) {
        let configuration = new SchemaConfiguration(conf);
        debug('creating ' + configuration.name + ' schema');
        let NewSchema = new mongoose.Schema(configuration.definition, configuration.options);

        let populateSchemaMethods = () => {
            let entries = Object.entries(configuration.methods);
            for (let entry of entries) {
                let methodName = entry[0],
                    method = entry[1];
                debug(`defining method ${configuration.name}.${methodName} methodName`);
                NewSchema.methods[methodName] = method;
            }
        };

        let populateSchemaHandlers = () => {
            for (let handler of configuration.handlers.handlers) {
                debug(`installing ${configuration.name} ${handler.type}-${handler.event} handler "${handler.description}"`);
                NewSchema[handler.type](handler.event, handler.handler);
            }
        };

        populateSchemaMethods();
        populateSchemaHandlers();
        debug(configuration.name + ' schema created');
        return NewSchema;
    },

    autowire (modelName, dir, optionOverrides = {}) {
        let schemaOptions = {
            name: modelName,
            definitionPath: path.join(dir, modelName + '.definition'),
            methodsPath: path.join(dir, modelName + '.methods'),
            handlerPath: path.join(dir, modelName + '.handlers'),
            optionsPath: path.join(__dirname, '/default_schema_options')
        };
        _.assign(schemaOptions, optionOverrides);
        let schema = this.makeSchema(schemaOptions);
        let model = mongoose.model(modelName, schema);
        return model;
    }
};
