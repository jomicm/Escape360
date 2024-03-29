// import React, { useState } from "react";
// import r360, { BrowserVideoPlayer, ReactInstance } from 'react-360-web';
import { asset, AppRegistry, Environment, NativeModules } from "react-360";
import useSocket from './src/hooks/useWebSocket';

import Poster from "./components/Poster";
import PosterBedroom from "./components/PosterBedroom";
import Rope from "./components/Rope";
import Hole from "./components/Hole";
import Inventory from "./components/Inventory";
import Phone from "./components/Phone";
import EventEmitter from "EventEmitter";
import BigPoster from "./components/BigPoster";
import PhoneNumpad from './components/PhoneNumpad';
import BedroomSafe from './components/BedroomSafe';
import SafeKeypad from './components/SafeKeypad';
import BathroomDoor from './components/BathroomDoor';
import NextRoomDoor from './components/NextRoomDoor';
import GoBackDoor from './components/GoBackDoor';
import AbstractArtFixed from './components/AbstractArt/AbstractArtFixed';
import AbstractArtDynamic from './components/AbstractArt/AbstractArtDynamic';
import BigAbstractArt from './components/AbstractArt/BigAbstractArt';
import MirrorCode from './components/AbstractArt/MirrorCode';
import Introduction from './components/Introduction';

import Bomb from './components/Bomb';
import SimonFixed from './components/SimonFixed';
import SimonDynamic from './components/SimonDynamic';
import Ghost from './components/Ghost';
import Banana from './objects/banana';
import Babanana from './components/Babanana';
import Bunny from './objects/bunny';
import Crowbar from './components/Crowbar';
import Chest from './objects/Chest';
import Outro from './components/Outro';
// import BlackHole from './components/BlackHole';
let puzzleAnswers;// = {phoneNumBasement:'5564'};
const getPuzzleAnswers = () => puzzleAnswers;
const dataStore = new EventEmitter();
import inventoryViewer from './src/helpers/inventoryViewer';
import { _componentsMgmt } from './src/helpers/componentsMgmt';
import registerComponent from './src/helpers/registerComponent';
import initialRoomState from './src/helpers/initialPlayerMgmt';

const { GameInfo } = NativeModules;

const onServerCommandReceived = comm => {  
  switch (comm.serCommName) {
    case 'joined':
      if (comm.serCommText.id === -1) {
        Environment.setBackgroundImage(asset('360_world.jpg'), {format: '2D', transition: 1000});
        break;
      }
      if (comm.serCommText.id === 1) { 
        Environment.setBackgroundImage(asset('360_bedroom.jpg'), {format: '2D', transition: 1000});
        dataStore.emit('globalListener', {name: 'bombTimer', content: {time: 1800000}});
      } 
      initialRoomState(comm.serCommText.id);
      puzzleAnswers = comm.serCommText.puzzleAnswers;
      dataStore.emit("globalListener", { name: "puzzleAnswersReceived", action: "click", content: puzzleAnswers });
      break;
    case 'shareState':
      dataStore.emit("globalListener", { name: "all", action: "click", content: comm.serCommText });
      break;
  }
  //upgradeReq.IncomingMessage.headers.url
};
const onMessageHandler = e => {
  const res = JSON.parse(e.data);
  if (res.serCommName) {
    onServerCommandReceived(res);
  }
};

// const ws = useSocket('ws://172.46.0.135:8080', onMessageHandler)
// const ws = useSocket('ws://172.46.3.245:8080', onMessageHandler)
// const ws = useSocket('ws://172.46.3.245:8080?clientId=' + GameInfo.clientId  + '&gameId=4242', onMessageHandler)
// const ws = useSocket('ws://172.46.0.135:8080?clientId=' + GameInfo.clientId  + '&gameId=4242', onMessageHandler)
// const ws = useSocket(`ws://192.168.0.101:8080?clientId=${GameInfo.clientId}&gameId=${GameInfo.gameId}`, onMessageHandler)
// const ws = useSocket(`ws://172.46.3.245:8080?clientId=${GameInfo.clientId}&gameId=${GameInfo.gameId}`, onMessageHandler)
const ws = useSocket(`ws://172.46.3.245:8080?clientId=${GameInfo.clientId}&gameId=${GameInfo.gameId}`, onMessageHandler)
// const ws = useSocket(`ws://synergizer360.com/websocket/?clientId=${GameInfo.clientId}&gameId=${GameInfo.gameId}`, onMessageHandler)
// const ws = useSocket('ws://172.46.1.177:8080', onMessageHandler)
// const ws = useSocket('ws://192.168.0.14:8080', onMessageHandler)
const componentsMgmt = _componentsMgmt(dataStore, ws);

setTimeout(() => {
  ws.send(JSON.stringify( {commName:"join", commText:GameInfo.gameId}));
}, 500);

AppRegistry.registerComponent("Rope", () => Rope);
AppRegistry.registerComponent("Poster", () => Poster);
AppRegistry.registerComponent("BigPoster", () => BigPoster)
AppRegistry.registerComponent("PosterBedroom", () => PosterBedroom);
AppRegistry.registerComponent("Hole", () => Hole);
AppRegistry.registerComponent("Inventory", () => Inventory);
AppRegistry.registerComponent("Phone", () => Phone);
AppRegistry.registerComponent("PhoneNumpad", () => PhoneNumpad);
AppRegistry.registerComponent('Rooms', () => Rooms);
AppRegistry.registerComponent('BedroomSafe', () => BedroomSafe);
AppRegistry.registerComponent('SafeKeypad', () => SafeKeypad);
AppRegistry.registerComponent('BathroomDoor', () => BathroomDoor);
AppRegistry.registerComponent('NextRoomDoor', () => NextRoomDoor);
AppRegistry.registerComponent('GoBackDoor', () => GoBackDoor);
AppRegistry.registerComponent('AbstractArtFixed', () => AbstractArtFixed);
AppRegistry.registerComponent('AbstractArtDynamic', () => AbstractArtDynamic);
AppRegistry.registerComponent('BigAbstractArt', () => BigAbstractArt);
AppRegistry.registerComponent('MirrorCode', () => MirrorCode);
AppRegistry.registerComponent('Bomb', () => Bomb);
AppRegistry.registerComponent('SimonDynamic', () => SimonDynamic);
AppRegistry.registerComponent('SimonFixed', () => SimonFixed);
AppRegistry.registerComponent('Ghost', () => Ghost);
AppRegistry.registerComponent('Banana', () => Banana);
AppRegistry.registerComponent('Babanana', () => Babanana);
AppRegistry.registerComponent('Bunny', () => Bunny);
AppRegistry.registerComponent('Crowbar', () => Crowbar);
AppRegistry.registerComponent('Chest', () => Chest);
AppRegistry.registerComponent('Introduction', () => Introduction);
AppRegistry.registerComponent('Outro', () => Outro);
// AppRegistry.registerComponent('BlackHole', () => BlackHole);

export { dataStore, getPuzzleAnswers, inventoryViewer, componentsMgmt, registerComponent, ws };