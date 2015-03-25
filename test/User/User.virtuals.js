module.exports = [
    {
        name: 'emailReverse',
        get: function() {
            return this.email.reverse();
        },
        set: function(value) {
            this.email = value.reverse();
        }
    }
];