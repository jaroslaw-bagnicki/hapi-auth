const { Server } = require('@hapi/hapi');
const basicAuthScheme = require('@hapi/basic');
const basicAuthConfig = require('./auth/basicAuth');
const cookieAuthScheme = require('@hapi/cookie');
const cookieAuthConfig = require('./auth/cookieAuth');
const jwtAuthScheme = require('hapi-auth-jwt2');
const jwtAuthConfig = require('./auth/tokenAuth');
const routes = require('./routes');

const server = new Server({
    port: 3000,
});

/** @type {Promise[]} */
const pluginsRegisterationPromisies = [
    server.register(basicAuthScheme),
    server.register(cookieAuthScheme),
    server.register(jwtAuthScheme),
    
];

server.auth.strategy('simple', 'basic', basicAuthConfig);
server.auth.strategy('session', 'cookie', cookieAuthConfig);
server.auth.strategy('token', 'jwt', jwtAuthConfig);

server.auth.default('token');

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