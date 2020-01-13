const bcrypt = require('bcrypt');

/** @typedef {{
    id: string,
    username: string,
    password: string,
    name: string,
}} User */

/** @typedef {Pick<User, 'id' | 'name'>} Credentials */

/** @type {User[]} */
const users = [
    {
        id: '2133d32a',
        username: 'jankowalski',
        name: 'Jan Kowalski',
        password: bcrypt.hashSync('kowalski1', 1),
    },
];


module.exports = users;