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
        console.log('Largate hijo de puta!')
        Environment.setBackgroundImage(asset('360_world.jpg'), {format: '2D', transition: 1000});
        break;
      }
      if (comm.serCommText.id === 1) { 
        Environment.setBackgroundImage(asset('360_bedroom.jpg'), {format: '2D', transition: 1000});
      } 
      initialRoomState(comm.serCommText.id);
      puzzleAnswers = comm.serCommText.puzzleAnswers;
      break;
    case 'shareState':
      dataStore.emit("globalListener", { name: "all", action: "click", content: comm.serCommText });
      break;
  }
};
const onMessageHandler = e => {
  // console.log('e', JSON.parse(e.data));
  const res = JSON.parse(e.data);
  if (res.serCommName) {
    onServerCommandReceived(res);
  }
  // console.log('STATE > res ', res);
  // setMessages([...messages, res]);
};

const ws = useSocket('ws://172.46.3.245:8080', onMessageHandler)
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

export { dataStore, getPuzzleAnswers, inventoryViewer, componentsMgmt, registerComponent, ws };