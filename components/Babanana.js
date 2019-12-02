import React from 'react';
import { AppRegistry, StyleSheet, Text, View, asset } from 'react-360';
import Video360 from './Video360';
import { dataStore, componentsMgmt } from '../index';


// The mock database
const SCENE_DEF = [
  {
    type: 'photo',
    title: 'Welcome Scene',
    source: asset('art_1.jpg'),
    audio: asset('door_1.wav'),
    next: 1,
    subtitle: 'This is the welcome scene, just look around!',
  },
  {
    type: 'photo',
    title: 'Minion Bananas',
    source: asset('360_world.jpg'),
    screen: {url: asset('banana.mp4').uri},
    next: 0,
    subtitle: 'BABABA BABA NANA',
  },
];

// The root react component of the app main surface
export default class Babanana extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    };
  }

  render() {
    const currentScene = SCENE_DEF[this.state.index];
    const nextScene = SCENE_DEF[SCENE_DEF[this.state.index].next];
    return (
      <View style={styles.panel}>
        <Video360
          style={{transform: [{rotateY: 50}]}}
          currentScene={currentScene}
          nextScene={nextScene}
         />
      </View>
    );
  }
};

// defining StyleSheet
const styles = StyleSheet.create({
  panel: {
    justifyContent: 'center',
    width: 450,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    transform: [
      {rotateY: '50deg'}
    ]
  },
});