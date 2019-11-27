import React, { useState } from "react";
import r360, { BrowserVideoPlayer, ReactInstance } from 'react-360-web';
import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Environment,
  VrButton,
} from "react-360";
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
import Bomb from './components/Bomb';
import BigBomb from './components/BigBomb';
import SimonFixed from './components/SimonFixed';
import SimonDynamic from './components/SimonDynamic';
import Ghost from './components/Ghost';
import useSocket from './src/hooks/useWebSocket';
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
        dataStore.emit('globalListener', {name: 'bombTimer', content: {time: 1800000}});
      } 
      initialRoomState(comm.serCommText.id);
      puzzleAnswers = comm.serCommText.puzzleAnswers;
      console.log('########', puzzleAnswers);
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

const ws = useSocket('ws://172.46.1.177:8080', onMessageHandler)
const componentsMgmt = _componentsMgmt(dataStore, ws);


setTimeout(() => {
  ws.send(JSON.stringify( {commName:"join", commText:'4242'}));
}, 500);

// The root react component of the subtitle surface
// class Rooms extends React.Component {
//   state = {
//     rightNumber: 8005551234,
//     index: 0,
//     show: false,
//     ws: null,
//     gameId: '4242'
//   };
//   render() {
//     return (
//       <View style={styles.subtitle}>
//       </View>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   panel: {
//     // Fill the entire surface
//     width: 1000,
//     height: 600,
//     backgroundColor: "rgba(55, 155, 155, 0.5)",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   greetingBox: {
//     padding: 20,
//     backgroundColor: "#000000",
//     borderColor: "#639dda",
//     borderWidth: 2
//   },
//   greeting: {
//     fontSize: 30
//   },
//   subtitle: {
//     backgroundColor: "rgba(0, 0, 0, 0.9)",
//   }
// });

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
AppRegistry.registerComponent('Bomb', () => Bomb);
AppRegistry.registerComponent('BigBomb', () => BigBomb);
AppRegistry.registerComponent('SimonDynamic', () => SimonDynamic);
AppRegistry.registerComponent('SimonFixed', () => SimonFixed);
AppRegistry.registerComponent('Ghost', () => Ghost);

 export { dataStore, getPuzzleAnswers, inventoryViewer, componentsMgmt, registerComponent, ws };