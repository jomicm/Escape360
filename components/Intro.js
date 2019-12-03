import React, { useState, Component } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, NativeModules } from 'react-360';
import { dataStore, inventoryViewer, componentsMgmt, registerComponent } from '../index';
const { AudioModule } = NativeModules;

class Intro extends Component {
  state = {
    play: false,
    show: true,
  }
  componentDidMount() {
    componentsMgmt.intro.state = this.state;
    componentsMgmt.intro.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.intro.state = this.state;
    }
    if (this.state.show) {
      console.log("hellooooo can you hear me?")
      setInterval(() => {
        AudioModule.playOneShot({
        source: asset('beep-bomb.mp3'),
        volume: 0.2,
      }, 1000)
    })};
  }
  _onPlayClick = (show) => {
    this.setState({play = false});
  }
  render(){
  return (
    <VrButton onClick={() => this._onHoleClick(true)}>
      { this.state.show && <Image style={styles.hole} source={asset(this.state.canIGoThrough ? 'hole_light_anchor.png' : 'hole_light.png')}/>}
    </VrButton>
  )}
}

const styles = StyleSheet.create({
  hole: {
    width:500, 
    height:300, 
    left:0, 
    top:0
  },
});

export default Hole;