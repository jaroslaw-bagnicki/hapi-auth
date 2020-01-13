/** @type {import('@hapi/hapi').ServerRoute[]} */
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (req, h) => h.response('Hello world!'),
    },
];