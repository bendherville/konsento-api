var hapi = require('hapi');
var routes = require('./routes');

var config = {};
var server = new hapi.Server('0.0.0.0', 8080, config);

for (var i = 0; i < routes.length; i++) {
  server.route(routes[i]);
}

if (!module.parent) {
  server.start(function () {
    console.log('Server started', server.info.uri);
  });
}

module.exports = server;
