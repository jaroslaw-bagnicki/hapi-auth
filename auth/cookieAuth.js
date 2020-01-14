const users = require('../models/users');
const { COOKIE_NAME } = require('../config');

/** @type {import('@hapi/cookie').Options} */
module.exports = {
    cookie: {
        name: COOKIE_NAME,
        encoding: 'iron',
        password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
        isSecure: false,
    },
    redirectTo: '/login',
    validateFunc: (req, session) => {
        const user = users.find(user => user.id === /** @type {{ id: string }} */ (session).id);

        if (!user) {
            return { valid: false, credentials: null };
        }

        return { valid: true, credentials: user };
    },
};