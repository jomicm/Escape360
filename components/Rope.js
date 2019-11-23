import React, { useState, Component } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';
// import dataStore from '../index';
import { dataStore } from '../index';


class Rope extends Component {
  state = {
    show: false
  }
  _onRopeClick = (show) => {
    dataStore.emit('ropeClick', show)
    this.setState({show: false})
  }
  _onRopeClickE = (show) => {
    this.setState({show: false})
  }
  _onRopeSet = (show) => {
    this.setState({show: true})
    console.log('rope set')
  }
  _onHoleClick = (show) => {
    // dataStore.emit('ropeClick', show)
    this.setState({show: true})
  }
  componentWillMount() {
    console.log('Mounting!');
    dataStore.addListener('holeClick', this._onHoleClick);
    dataStore.addListener('ropeClick', this._onRopeClickE);
    dataStore.addListener('ropeSet', this._onRopeSet);
  }
  render(){
  return (
    <VrButton onClick={() => this._onRopeClick(true)}>
      { this.state.show && <Image style={styles.rope} source={asset('rope.png')}/>}
    </VrButton>
  )}
}

const styles = StyleSheet.create({
  rope: {
    width:130, 
    height:180, 
    left:0, 
    top:0
  },
});

export default Rope;