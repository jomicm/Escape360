import React, { useState, Component } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';
// import dataStore from '../index';

import { dataStore } from '../index';

class Phone extends Component {
  state = {
    show: false
  }
  // _onHoleClick = (show) => {
  //   dataStore.emit('holeClick', show)
  //   this.setState({show: false})
  // }
  _onRopeClick = (show) => {
    this.setState({show: true})
  }
  _onHoleClick = (show) => {
    this.setState({show: false})
  }
  _onPhoneClick = show => {
    dataStore.emit('phoneClick', show)
    console.log('something')
  }
  componentWillMount() {
    console.log('Mounting!');
    dataStore.addListener('ropeClick', this._onRopeClick);
    dataStore.addListener('holeClick', this._onHoleClick);
  }
  render(){
  return (
    <VrButton onClick={() => this._onPhoneClick(true)}>
      { this.state.show && <Image style={styles.hole} source={asset('phone.png')}/>}
    </VrButton>
  )}
}

const styles = StyleSheet.create({
  hole: {
    width:110, 
    height:100, 
    left:0, 
    top:0
  },
});

export default Phone;