import React, { useState, Component } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';
import dataStore from '../index';

class Hole extends Component {
  state = {
    showRope: false,
    show: false
  }
  _onHoleClick = (show) => {
    dataStore.emit('holeClick', show)
    this.setState({show: false})
  }
  _onRopeClick = (show) => {
    this.setState({show: true})
  }
  componentWillMount() {
    console.log('Mounting!');
    dataStore.addListener('ropeClick', this._onRopeClick);
  }
  render(){
  return (
    <VrButton onClick={() => this._onHoleClick(true)}>
      { this.state.show && <Image style={styles.hole} source={asset(this.state.showRope ? 'hole_light_anchor.png' : 'hole_light.png')}/>}
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