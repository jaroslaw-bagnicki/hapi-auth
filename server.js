const { Server } = require('@hapi/hapi');
const routes = require('./routes');

const server = new Server({
    port: 3000,
});

server.route(routes);

const start = async() => {
    await server.start();
    console.log('Server listen on port 3000...');
    return server;
};

const init = async() => {
    await server.initialize();
    return server;
};

module.exports = {
    init,
    start,
};