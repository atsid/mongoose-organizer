'use strict';
var _ = require('lodash'),
    mongoose = require('mongoose'),
    debug = require('debug')('application:persistence'),
    path = require('path');

module.exports = {
    /**
     * Creates a schema using the given configuration object.
     */
    makeSchema (configuration) {
        debug('creating ' + configuration.name + ' schema');
        let Schema = mongoose.Schema,
            schemaDefinition = require(configuration.definitionPath),
            schemaOptions = configuration.options || require(configuration.optionsPath),
            schemaMethods = require(configuration.methodsPath),
            schemaHandlers = require(configuration.handlerPath),
            NewSchema = new Schema(schemaDefinition, schemaOptions);

        let populateSchemaMethods = () => {
            let entries = Object.entries(schemaMethods);
            for (let entry of entries) {
                let methodName = entry[0],
                    method = entry[1];
                debug(`defining method ${configuration.name}.${methodName} methodName`);
                NewSchema.methods[methodName] = method;
            }

            for (let handler of schemaHandlers.handlers) {
                debug(`installing ${configuration.name} ${handler.type}-${handler.event} handler "${handler.description}"`);
                NewSchema[handler.type](handler.event, handler.handler);
            }
        };

        populateSchemaMethods();
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
