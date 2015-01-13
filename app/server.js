var hapi = require('hapi');
var routes = require('./routes');

var server = new hapi.Server()
server.connection({ address: '0.0.0.0', port: process.env.PORT });

for (var i = 0; i < routes.length; i++) {
  server.route(routes[i]);
}

if (!module.parent) {
  server.start(function () {
    console.log('Server started', server.info.uri);
  });
}

module.exports = server;
