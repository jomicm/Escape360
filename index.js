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
import useSocket from './src/hooks/useWebSocket';
let puzzleAnswers;// = {phoneNumBasement:'5564'};
const getPuzzleAnswers = () => puzzleAnswers;
const dataStore = new EventEmitter();
import inventoryViewer from './src/helpers/inventoryViewer';
import { _componentsMgmt } from './src/helpers/componentsMgmt';
import registerComponent from './src/helpers/registerComponent';
import initialRoomState from './src/helpers/roomsMgmt';

const onServerCommandReceived = comm => {  
  console.log('Comando recibido: ', comm);
  switch (comm.serCommName) {
    case 'joined':
      console.log('Comando recibido: joined as: ', comm.serCommText.id);
      if (comm.serCommText.id === -1) {
        console.log('Get out!')
        Environment.setBackgroundImage(asset('360_world.jpg'), {format: '2D', transition: 1000});
        break;
      }
      if (comm.serCommText.id === 1) { 
        // dataStore.emit('ropeClick', true);
        Environment.setBackgroundImage(asset('360_bedroom.jpg'), {format: '2D', transition: 1000});
      } 
      initialRoomState(comm.serCommText.id);
      puzzleAnswers = comm.serCommText.puzzleAnswers;
      console.log('puzzleAnswers', puzzleAnswers);
      console.log('pA', comm.serCommText)
      break;
    case 'shareState':
      console.log('#### DESDE el server a punto de mostra la rope 1 !!!!')
      // dataStore.emit('ropeSet', true);
      dataStore.emit("globalListener", { name: "all", action: "click", content: comm.serCommText });

      console.log('#### DESDE el server a punto de mostra la rope 2 !!!!')
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

// The root react component of the subtitle surface
class Rooms extends React.Component {
  state = {
    rightNumber: 8005551234,
    index: 0,
    show: false,
    // onMessageHandler: e => {
    //   // console.log('e', JSON.parse(e.data));
    //   const res = JSON.parse(e.data);
    //   if (res.serCommName) {
    //     this.state.onServerCommandReceived(res);
    //   }
    //   // console.log('STATE > res ', res);
    //   // setMessages([...messages, res]);
    // },
    // onServerCommandReceived: comm => {  
    //   console.log('Comando recibido: ', comm);
    //   switch (comm.serCommName) {
    //     case 'joined':
    //       console.log('Comando recibido: joined as: ', comm.serCommText.id);
    //       if (comm.serCommText.id === -1) {
    //         console.log('Get out!')
    //         Environment.setBackgroundImage(asset('360_world.jpg'), {format: '2D', transition: 1000});
    //         break;
    //       }
    //       if (comm.serCommText.id === 1) { 
    //         // dataStore.emit('ropeClick', true);
    //         Environment.setBackgroundImage(asset('360_bedroom.jpg'), {format: '2D', transition: 1000});
    //       } 
    //       initialRoomState(comm.serCommText.id);
    //       puzzleAnswers = comm.serCommText.puzzleAnswers;
    //       console.log('puzzleAnswers', puzzleAnswers);
    //       console.log('pA', comm.serCommText)
    //       break;
    //     case 'shareState':
    //       console.log('#### DESDE el server a punto de mostra la rope 1 !!!!')
    //       dataStore.emit('ropeSet', true);
    //       console.log('#### DESDE el server a punto de mostra la rope 2 !!!!')
    //       break;
    //   }
    // },
    ws: null,
    gameId: '4242'
    // send: null
  };
  
  componentWillMount() {
    console.log('Mounting Main!');
    dataStore.addListener('posterClick', this._onPosterClick);
    dataStore.addListener('posterBedroomClick', this._onPosterBedroomClick);
    dataStore.addListener('ropeClick', this._onRopeClick);
    dataStore.addListener('holeClick', this._onHoleClick);
    dataStore.addListener('ropeSet', this._onRopeSet);
    // const onMessageHandler =  e => {
    //   const res = JSON.parse(e.data);
    //   // setMessages([...messages, res]);
    // };
    // ws = useSocket('ws://172.46.3.245:8080', this.state.onMessageHandler);
    //this.setState({ ws: useSocket('ws://172.46.3.245:8080', this.state.onMessageHandler) });
    console.log('Trying to connect!')
    
    // setTimeout(() => {
    //   this.state.ws.send(JSON.stringify( {commName:"join", commText:this.state.gameId}));
    //   // console.log('>>>>>>>>>> BrowserInfo', ReactInstance);
    // }, 1000);
    // send = useSocket('ws://172.46.3.245:8080', onMessageHandler)
    // this.setState({ send });
    // useSocket('ws://172.46.3.245:8080', onMessageHandler)
  }
  componentWillUnmount() {
    console.log('Unmounting!');
    dataStore.removeListener('posterClick', this._onPosterClick);
    dataStore.removeListener('ropeClick', this._onRopeClick);
    dataStore.removeListener('holeClick', this._onHoleClick);
  }
  componentDidMount() {
    // BrowserInfo.getBatteryLevel(level => {
    //   console.log({batteryLevel: level});
    // });
  }
  _onPosterClick = (show) => {
    // ws.send(JSON.stringify( {name:"Zombie Bunny", message:"Don't kill me Mr Robot!"}));
    // ws.send(JSON.stringify( {commName:"join", commText:"4242"}));
    // ws.newRoom('This is a new Room!');
    this.setState({show: !this.state.show});
  };
  _onPosterBedroomClick = (show) => {
    console.log('Show is ' + show);
    this.setState({message: show, show: !this.state.show});
  };
  _onRopeSet = (show) => {
    console.log('Show is ' + show);
    this.state.ws.send(JSON.stringify( {commName:"shareState", commText:{gameId:this.state.gameId, _onRopeSet: show}}));
  };
  _onRopeClick = (show) => {
    console.log('From Rope method')
    Environment.setBackgroundImage(asset('360_bedroom.jpg'), {format: '2D', transition: 1000});
  }
  _onHoleClick = (show) => {
    console.log('From Rope method')
    Environment.setBackgroundImage(asset('360_basement.jpg'), {format: '2D', transition: 1000});
  }

  render() {
    // this.state.ws.send(JSON.stringify( {commName:"join", commText:"4242"}));
    return (
      <View style={styles.subtitle}>
        {/* {this.state.show && <BigPoster message={this.state.message} width={this.props.width} height={this.props.height} onPoster={this._onPosterClick}/>} */}
        {/* <Test /> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: "rgba(55, 155, 155, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  greetingBox: {
    padding: 20,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2
  },
  greeting: {
    fontSize: 30
  },
  subtitle: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  }
});

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

 export { dataStore, getPuzzleAnswers, inventoryViewer, componentsMgmt, registerComponent, ws };
// export default { dataStore };
// export { dataStore, puzzleAnswers};