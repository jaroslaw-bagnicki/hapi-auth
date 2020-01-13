const users = require('../models/users');

/** @type {import('@hapi/cookie').Options} */
module.exports = {
    cookie: {
        name: 'sid-example',
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