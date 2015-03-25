'use strict';
var _ = require('lodash'),
    debug = require('debug')('mongoose-organizer'),
    SchemaConfiguration = require('./schema_configuration'),
    path = require('path');

/**
 * Creates a schema using the given configuration object.
 */
let makeSchema = (conf) => {
    let configuration = new SchemaConfiguration(conf);
    let mongoose = configuration.mongoose;
    debug('creating ' + configuration.name + ' schema');
    let NewSchema = new mongoose.Schema(configuration.definition, configuration.options);

    let populateSchemaMethods = () => {
        let entries = Object.entries(configuration.methods);
        for (let entry of entries) {
            let methodName = entry[0],
                method = entry[1];
            debug(`method method ${configuration.name}.${methodName} methodName`);
            NewSchema.methods[methodName] = method;
        }
    };

    let populateSchemaHandlers = () => {
        for (let handler of configuration.handlers) {
            debug(`installing ${configuration.name} ${handler.type}-${handler.event} handler "${handler.description}"`);
            NewSchema[handler.type](handler.event, handler.handler);
        }
    };

    let populateSchemaVirtuals = () => {
        for (let virtual of configuration.virtuals) {
            debug(`installing virtual ${configuration.name} - ${virtual.name}`);
            let virtDef = NewSchema.virtual(virtual.name, virtual.options);
            if (virtual.get) {
                virtDef.get(virtual.get);
            }
            if (virtual.set) {
                virtDef.set(virtual.set);
            }
        }
    };

    populateSchemaMethods();
    populateSchemaHandlers();
    populateSchemaVirtuals();
    debug(configuration.name + ' schema created');
    return NewSchema;
};

let autowire = (modelName, dir, optionOverrides = {}) => {
    let schemaOptions = {
        name: modelName,
        definitionPath: path.join(dir, modelName + '.definition'),
        methodsPath: path.join(dir, modelName + '.methods'),
        handlersPath: path.join(dir, modelName + '.handlers'),
        virtualsPath: path.join(dir, modelName + '.virtuals')
    };
    _.assign(schemaOptions, optionOverrides);
    let configuration = new SchemaConfiguration(schemaOptions);
    let schema = makeSchema(schemaOptions);
    let model = configuration.mongoose.model(modelName, schema);
    return model;
};

module.exports = {
    makeSchema,
    autowire
};
