import React, { useState, Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View } from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';

class Bomb extends Component {
  state = {
    show: false,
    showBattery: false,
  }

  _onBombClick = (show) => {
    dataStore.emit('globalListener', {name: 'bomb', action:'click'});
  }
  componentDidMount() {
    componentsMgmt.bomb.state = this.state;
    componentsMgmt.bomb.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.bomb.state = this.state;
    }
  }
  render() {
  return (
    <View>
      {this.state.show && <View><Text style={styles.timer}>30:00</Text>
      <VrButton onClick={() => this._onBombClick(true)}>
        <Image style={{width:500, height:250, left:0, top:0}} source={asset('bomb.jpg')}/>
      </VrButton></View>}
    </View>
  )}
}

const styles = StyleSheet.create({
  timer: {
    backgroundColor: 'black',
    textAlign: 'center',
    fontSize: 100,
    fontWeight: '500',
    color: 'red',
  }
});

export default Bomb