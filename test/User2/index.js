let organizer = require('../../src/index');
module.exports = (mongoose) => organizer.autowire('User2', __dirname, {mongoose: mongoose});