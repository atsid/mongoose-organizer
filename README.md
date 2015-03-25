# mongoose-organizer
Mongoose Model Organization

The Mongoose-Organizer provides a factory utility that allows you to organize Mongoose models using declarative configuration.

```
project
└───models
    ├───User
    |   └───index.js (Uses mongoose-organizer to autowire the model together)\
    |   └───User.definition.js (Mongoose definition object)
    |   └───User.methods.js (An object of schema-methods by name)
    |   └───User.handlers.js (An array of event handler implementations e.g. pre-save)
    |   └───User.virtuals.js (An array of virtual properties)
```

# Usage
By using the 'autowire' function, the mongoose-organizer will reflect over your model's path and load in model components.
```js
// Index.js
let organizer = require('mongoose-organizer');
module.exports = organizer.autowire('User', __dirname, {<optional configuration overrides>});
```

# Non-Autowiring Usage
By using the 'makeSchema' function, the mongoose-organizer can use inline configuration.
```js
let organizer = require('mongoose-organizer');
module.exports = makeSchema({<configuration object>}
```

