'use strict';

let defaultOptions = {
    toJSON: {virtual: true},
    toObject: {virtuals: true}
};

/**
 * Option Values may be set explicitly or using a path that is require()d
 * @param config The raw configuration object
 * @param explicitKey The explicit configuration key
 * @param pathKey The config path key
 * @param defaultValue The default value
 * @returns {*} The resolved configuration value.
 */
let determineOptionValue = (config, explicitKey, pathKey, defaultValue) => {
    if (config[explicitKey]) {
        return config[explicitKey];
    } else if (config[pathKey]) {
        return require(config[pathKey]);
    } else {
        return defaultValue;
    }
};

class SchemaConfiguration {
    constructor(config) {
        if (!config) {
            throw new Error("config parameter must be defined");
        }
        this.name = config.name;
        this.definition = determineOptionValue(config, 'definition', 'definitionPath', {});
        this.options = determineOptionValue(config, 'options', 'optionsPath', defaultOptions);
        this.methods = determineOptionValue(config, 'methods', 'methodsPath', {});
        this.virtuals = determineOptionValue(config, 'virtuals', 'virtualsPath', {});
        this.handlers = determineOptionValue(config, 'handlers', 'handlersPath', {});
    }
}

module.exports = SchemaConfiguration;