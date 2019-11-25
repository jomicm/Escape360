import React, { useState, Component } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';
// import dataStore from '../index';

import { dataStore, componentsMgmt } from '../index';

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
    // dataStore.emit('phoneClick', show)
    dataStore.emit('globalListener', {name: 'phone', action:'click'});
  }
  componentWillMount() {
    console.log('Mounting!');
    dataStore.addListener('ropeClick', this._onRopeClick);
    dataStore.addListener('holeClick', this._onHoleClick);
  }
  componentDidMount() {
    componentsMgmt.phone.state = this.state;
    componentsMgmt.phone.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.phone.state = this.state;
    }
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