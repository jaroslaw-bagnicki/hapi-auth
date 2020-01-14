const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const { COOKIE_NAME, JWT_SECRET } = require('../config');

/** @type {import('@hapi/hapi').ServerRoute[]} */
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (req, h) => h.response({ message: 'Hello world!' }),
        options: {
            auth: false,
        },
    },
    {
        method: 'GET',
        path: '/restricted',
        handler: (req, h) => h.response({ message: 'Hello world!' }),
        options: {
            auth: 'token',
        },
    },
    {
        method: 'POST',
        path: '/session-login',
        handler: (req, h) => {
            const { username, password } = /** @type {{ username: string, password: string}} */ (req.payload);
            const user = users.find(user => user.username === username);

            if (user && bcrypt.compareSync(password, user.password)) {
                req.cookieAuth.set({ id: user.id });
                return h.redirect('/');
            }

            return h.redirect('/login');

        },
        options: {
            auth: {
                mode: 'try',
            },
        },
    },
    {
        method: 'POST',
        path: '/session-logout',
        handler: (req, h) => h.response().unstate(COOKIE_NAME),
    },
    {
        method: 'POST',
        path: '/token-login',
        handler: (req, h) => {
            const { username, password } = /** @type {{ username: string, password: string}} */ (req.payload);
            const user = users.find(user => user.username === username);

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, JWT_SECRET);
                return h.response({
                    success: true,
                    message: 'Authentication successful!',
                    id_token: token, 
                });
            }
            return h.redirect('/login');

        },
        options: {
            auth: {
                mode: 'try',
            },
        },
    },
];