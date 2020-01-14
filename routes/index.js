const bcrypt = require('bcrypt');
const users = require('../models/users');
const { cookieName } = require('../config');

/** @type {import('@hapi/hapi').ServerRoute[]} */
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (req, h) => h.response({ message: 'Hello world!' }),
    },
    {
        method: 'GET',
        path: '/login',
        handler: (req, h) => h.response(`<html>
            <head>
                <title>Login page</title>
            </head>
            <body>
                <h3>Please Log In</h3>
                <form method="post" action="/login">
                    Username: <input type="text" name="username"><br>
                    Password: <input type="password" name="password"><br/>
                <input type="submit" value="Login"></form>
            </body>
        </html>`),
        options: {
            auth: false,
        },
    },
    {
        method: 'POST',
        path: '/login',
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
        path: '/logout',
        handler: (req, h) => h.response().unstate(cookieName),
    },
];