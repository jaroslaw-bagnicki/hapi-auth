const { Server } = require('@hapi/hapi');
const basicAuthScheme = require('@hapi/basic');
const cookieAuthScheme = require('@hapi/cookie');
const basicAuthConfig = require('./auth/basicAuth');
const cookieAuthConfig = require('./auth/cookieAuth');
const routes = require('./routes');

const server = new Server({
    port: 3000,
});

/** @type {Promise[]} */
const pluginsRegisterationPromisies = [
    server.register(basicAuthScheme),
    server.register(cookieAuthScheme),
    
];

server.auth.strategy('simple', 'basic', basicAuthConfig);
server.auth.strategy('session', 'cookie', cookieAuthConfig);

server.auth.default('session');

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