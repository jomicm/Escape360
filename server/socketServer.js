const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log('Before connecting');
wss.on('connection', (client) => {
  console.log('new connection');
  client.on('message', (message)  => {
    console.log('message', message);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  const firstMsg = { msg: 'Hi there from server' };
  client.send(JSON.stringify(firstMsg));
});
