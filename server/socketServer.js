const WebSocket = require('ws');
const uuid = require('uuid');
const wss = new WebSocket.Server({ port: 8080 });
const puzzleAnswers = require('./consts/puzzleAnswers');

// obj = {};

const games = ['1452'];
const players = [];
const game = {}

console.log('Before connecting');
wss.on('connection', (client) => {
  client.id = uuid.v4();
  console.log('new connection from:', client.id);
  // console.log(client);
  client.on('message', (message)  => {
    const received = JSON.parse(message);
    console.log('message received', received);
    if (received.commName && received.commName === 'join' && received.commText) {
      // players.push(client.id);
      console.log('received inside');
      const { commText } = received;
      console.log('commText', commText);
      if (!game[commText]) {
        game[commText] = {};
        game[commText]['puzzleAnswers'] = puzzleAnswers();
      }
      if (!game[commText].players) {
        console.log('>> Player 1 has joined!');
        game[commText].players = [client.id];
        client.send(JSON.stringify({clientId:client.id, serCommName:'joined', serCommText:0}));
        console.log('Puzzle Answers 1 > ', game[commText]['puzzleAnswers']);
      } else if (!game[commText].players.includes(client.id) && game[commText].players.length < 2) {
        console.log('>> Player 2 has joined!');
        game[commText].players.push(client.id);
        client.send(JSON.stringify({clientId:client.id, serCommName:'joined', serCommText:1}));
        console.log('Puzzle Answers 2 > ', game[commText]['puzzleAnswers']);
      } else {
        console.log('>> Room is full! or same user');
        client.send(JSON.stringify({clientId:client.id, serCommName:'joined', serCommText:-1}));
      }

      // game[commText].players ? game[commText].players.push(client.id) : game[commText].players = [client.id];
      console.log('game', game);
    }
    // wss.clients.forEach(client => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(message);
    //   }
    // });
  });
  const firstMsg = { msg: 'Hi there from server' };
  client.send(JSON.stringify(firstMsg));
});
