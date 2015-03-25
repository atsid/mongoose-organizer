'use strict';
module.exports = {
    /*
     * Determines if the given password matches the user's password
     * @param password the input password
     */
    isValidPassword (password) {
        // don't use plaintext passwords in production
        return password === this.password;
    }
};
