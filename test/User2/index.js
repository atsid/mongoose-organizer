let organizer = require('../../src/index');
module.exports = (mongoose) => organizer.autowire('User', __dirname, {mongoose: mongoose});