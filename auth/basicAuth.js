const bcrypt = require('bcrypt');
const users = require('../models/users');

/** @type {import('@hapi/basic').Validate} */
exports.validate = async (req, username, password, h) => {
    const user = users.find(user => user.username === username);

    if (!user) {
        return {
            isValid: false,
            credentials: null,
        };
    }

    const isValid = bcrypt.compareSync(password, user.password);

    return {
        isValid: isValid,
        /** @type {import('../models/users').Credentials} */
        credentials: {
            id: user.id,
            name: user.name, 
        },
    };
};