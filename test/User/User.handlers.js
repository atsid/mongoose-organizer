module.exports = [
    {
        type: 'pre',
        event: 'save',
        description: 'encrypt password on save',
        handler: function (next) {
            let user = this,
                isPasswordModified = user.isModified('password');

            if (isPasswordModified) {
                // do some encryption
                next()
            } else {
                next();
            }
        }
    }
];
