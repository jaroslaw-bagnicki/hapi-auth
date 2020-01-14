const users = require('../models/users');
const { JWT_SECRET } = require('../config');

/** @type {import('hapi-auth-jwt2').Options} */
module.exports = {
    key: JWT_SECRET,
    validate: (/** @type {{ id: string }} */ decoded) => {
        const profile = users.find(user => user.id === decoded.id);
        if (!profile) {
            return { isValid: false };
        }
        return { isValid: true };
    },
};