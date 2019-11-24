import React, { useState, Component } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, NativeModules } from 'react-360';
import { dataStore, inventoryViewer, componentsMgmt, registerComponent } from '../index';
const { AudioModule } = NativeModules;

class Hole extends Component {
  state = {
    show: false,
    canIGoThrough: false
  }
  componentDidMount() {
    componentsMgmt.hole.state = this.state;
    componentsMgmt.hole.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.hole.state = this.state;
    }
  }
  _onHoleClick = (show) => {
    if (this.state.canIGoThrough) {
      dataStore.emit('holeClick', show)
      this.setState({show: false})
    } else {
      
      if (componentsMgmt.inventory.state.selectedItem === 'rope') {
        this.setState({canIGoThrough: true});
        dataStore.emit('itemUsed', 'rope');
        dataStore.emit('ropeSet', show);

      } else {
        AudioModule.playOneShot({
          source: asset('beep-error.mp3'),
          volume: 0.8,
        });
      }
    }
  }
  _onRopeClick = (show) => {
    this.setState({show: true})
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