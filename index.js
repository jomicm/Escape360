// import React, { useState } from "react";
// import r360, { BrowserVideoPlayer, ReactInstance } from 'react-360-web';
import { asset, AppRegistry, Environment } from "react-360";
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

import Bomb from './components/Bomb';
import BigBomb from './components/BigBomb';
import SimonFixed from './components/SimonFixed';
import SimonDynamic from './components/SimonDynamic';
import Ghost from './components/Ghost';
let puzzleAnswers;// = {phoneNumBasement:'5564'};
const getPuzzleAnswers = () => puzzleAnswers;
const dataStore = new EventEmitter();
import inventoryViewer from './src/helpers/inventoryViewer';
import { _componentsMgmt } from './src/helpers/componentsMgmt';
import registerComponent from './src/helpers/registerComponent';
import initialRoomState from './src/helpers/initialPlayerMgmt';


const onServerCommandReceived = comm => {  
  console.log('Comando recibido: ', comm);
  switch (comm.serCommName) {
    case 'joined':
      console.log('Comando recibido: joined as: ', comm.serCommText.id);
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
      console.log('Comando recibido: share state as: ', comm.serCommText.id);
      dataStore.emit("globalListener", { name: "all", action: "click", content: comm.serCommText });
      break;
  }
};
const onMessageHandler = e => {
  const res = JSON.parse(e.data);
  if (res.serCommName) {
    onServerCommandReceived(res);
  }
};

const ws = useSocket('ws://172.46.0.135:8080', onMessageHandler)
// const ws = useSocket('ws://192.168.0.1:8080', onMessageHandler)
const componentsMgmt = _componentsMgmt(dataStore, ws);

setTimeout(() => {
  ws.send(JSON.stringify( {commName:"join", commText:'4242'}));
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
AppRegistry.registerComponent('BigBomb', () => BigBomb);
AppRegistry.registerComponent('SimonDynamic', () => SimonDynamic);
AppRegistry.registerComponent('SimonFixed', () => SimonFixed);
AppRegistry.registerComponent('Ghost', () => Ghost);

export { dataStore, getPuzzleAnswers, inventoryViewer, componentsMgmt, registerComponent, ws };