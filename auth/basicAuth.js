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
        /** @type {Credentials} */
        credentials: {
            id: user.id,
            name: user.name, 
        },
    };
};