const WebSocket = require('ws');
const uuid = require('uuid');
const wss = new WebSocket.Server({ port: 8080 });
const puzzleAnswers = require('./consts/puzzleAnswers');

// obj = {};

// const games = ['1452'];
// const players = [];
const game = {};

console.log('Before connecting');
wss.on('connection', (client) => {
  console.log('client....UR', client.upgradeReq.url);
  console.log('client....UR', client.upgradeReq.url.replace('/?',''));
  let params = client.upgradeReq.url.replace('/websocket/?','');
  // let params = client.upgradeReq.url.replace('/?',''); //works with local host
  params = params.split('&');
  const paramsObj = {};
  params.map(p => paramsObj[p.split('=')[0]] = p.split('=')[1]);
  console.log('params', paramsObj);

  // console.log('client....S', client.Socket);
  

  // client.id = uuid.v4();
  client.id = paramsObj.clientId;
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
        client.send(JSON.stringify({clientId:client.id, serCommName:'joined', serCommText:{id:0, puzzleAnswers:game[commText]['puzzleAnswers']}}));
        console.log('Puzzle Answers 1 > ', game[commText]['puzzleAnswers']);
        console.log('Puzzle Answers AbstractArt 1 > ', game[commText]['puzzleAnswers']['puzzleAbstractArt']);
      } else if (!game[commText].players.includes(client.id) && game[commText].players.length < 2) {
        console.log('>> Player 2 has joined!');
        game[commText].players.push(client.id);
        client.send(JSON.stringify({clientId:client.id, serCommName:'joined', serCommText:{id:1, puzzleAnswers:game[commText]['puzzleAnswers']}}));
        // client.send(JSON.stringify({clientId:client.id, serCommName:'joined', serCommText:1}));
        console.log('Puzzle Answers 2 > ', game[commText]['puzzleAnswers']);
        console.log('Puzzle Answers AbstractArt 2 > ', game[commText]['puzzleAnswers']['puzzleAbstractArt']);
      } else {
        console.log('>> Room is full! or same user');
        client.send(JSON.stringify({clientId:client.id, serCommName:'joined', serCommText:{id:-1}}));
      }

      // game[commText].players ? game[commText].players.push(client.id) : game[commText].players = [client.id];
      console.log('game', game);
    } else if (received.commName && received.commName === 'shareState' && received.commText) {
      console.log('>>> SHARE STATE', received);
      console.log('>>> share state id> ', client.id);
      const { commText } = received;
      console.log('commText', commText);
      console.log('game[commText]', game[received.commText.gameId]);
      const otherPlayer = game[received.commText.gameId].players.filter(x => x !== client.id)[0];
      console.log('otherPlayer', otherPlayer);
      wss.clients.forEach(c => {
        if (c.id === otherPlayer) {
          console.log('Hole clicked to > ', c.id);
          c.send(JSON.stringify({serCommName: 'shareState', serCommText: received.commText.prop}));
        }
      });
    }
  });
  const firstMsg = { msg: 'Hi there from server' };
  client.send(JSON.stringify(firstMsg));
});
