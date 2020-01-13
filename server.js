const { Server } = require('@hapi/hapi');
const basicAuthScheme = require('@hapi/basic');
const { validate } = require('./auth/basicAuth');
const routes = require('./routes');

const server = new Server({
    port: 3000,
});

/** @type {Promise[]} */
const pluginsRegisterationPromisies = [
    server.register(basicAuthScheme),
];

server.auth.strategy('simple', 'basic', { validate });
server.auth.default('simple');

server.route(routes);

const start = async() => {
    await Promise.all(pluginsRegisterationPromisies);
    await server.start();
    console.log('Server listen on port 3000...');
    return server;
};

const init = async() => {
    await Promise.all(pluginsRegisterationPromisies);
    await server.initialize();
    return server;
};

module.exports = {
    init,
    start,
};