import React, { useState } from "react";
import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Environment,
  VrButton
} from "react-360";
import Poster from "./components/Poster";
import PosterBedroom from "./components/PosterBedroom";
import Rope from "./components/Rope";
import Hole from "./components/Hole";
import Phone from "./components/Phone";
import EventEmitter from "EventEmitter";
import BigPoster from "./components/BigPoster";
import Numbers from './components/Numbers';
import BedroomSafe from './components/BedroomSafe';
import SafeKeypad from './components/SafeKeypad';
import useSocket from './src/hooks/useWebSocket';
import SimonFixed from './components/SimonFixed';

const dataStore = new EventEmitter();

function Test() {
  const [messages, setMessages] = useState([]);
  return (
    <View>
      <Text>This is just a sample component</Text>
    </View>
  )
}

// The root react component of the subtitle surface
class Rooms extends React.Component {
  state = {
    rightNumber: 8005551234,
    index: 0,
    show: false,
  };
  
  componentWillMount() {
    console.log('Mounting Main!');
    dataStore.addListener('posterClick', this._onPosterClick);
    dataStore.addListener('posterBedroomClick', this._onPosterBedroomClick);
    dataStore.addListener('ropeClick', this._onRopeClick);
    dataStore.addListener('holeClick', this._onHoleClick);
    // const onMessageHandler =  e => {
    //   const res = JSON.parse(e.data);
    //   setMessages([...messages, res]);
    // };
    // const { send } = useSocket('ws://172.46.3.245:8080', onMessageHandler)
  }
  componentWillUnmount() {
    console.log('Unmounting!');
    dataStore.removeListener('posterClick', this._onPosterClick);
    dataStore.removeListener('ropeClick', this._onRopeClick);
    dataStore.removeListener('holeClick', this._onHoleClick);
  }
  _onPosterClick = (show) => {
    console.log('Show is ' + show);
    this.setState({show: !this.state.show});
  };
  _onPosterBedroomClick = (show) => {
    console.log('Show is ' + show);
    this.setState({message: show, show: !this.state.show});
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
AppRegistry.registerComponent("Phone", () => Phone);
AppRegistry.registerComponent("Numbers", () => Numbers);
AppRegistry.registerComponent('Rooms', () => Rooms);
AppRegistry.registerComponent('BedroomSafe', () => BedroomSafe);
AppRegistry.registerComponent('SafeKeypad', () => SafeKeypad);
AppRegistry.registerComponent('SimonFixed', () => SimonFixed);

export default dataStore