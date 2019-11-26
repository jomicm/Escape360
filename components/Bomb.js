import React, { useState, Component, Fragment, } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View, NativeModules } from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';
const { AudioModule } = NativeModules

class Bomb extends Component {
  state = {
    show: false,
    showBattery: false,
    bombTime: 1800000,
    bombDisplay: '30:00',
    color: 'red',
    isRunning: false
  }

  _onBombClick = (show) => {
    // dataStore.emit('globalListener', {name: 'bomb', action:'click'});

    if (this.state.isRunning) {
      return
    }
    this.setState({isRunning: true})
    const timer = (initTime) => {
      setInterval(() => {
        let minutes = Math.floor(initTime / 60000).toFixed(0);
        minutes = minutes.length === 1 ? '0' + minutes : minutes
        let seconds = ((initTime / 1000) % 60).toFixed(0);
        seconds = seconds.length === 1 ? '0' + seconds : seconds
        
        if (initTime >= 1000) {
          this.setState({color: 'red'})
          initTime -= 1000;
          this.setState({bombDisplay: `${minutes}:${seconds}`})
          AudioModule.playOneShot({
            source: asset('beep-bomb.mp3'),
            volume: 0.4,
          });
          setTimeout(() => {
            this.setState({color: 'black'})
          }, 700)
        } else {
          this.setState({color: 'red'})
          this.setState({bombDisplay: '00:00'})
          setTimeout(() => {
            this.setState({color: 'black'})
          }, 700)
        }
      }, 1000)
    };
    timer(this.state.bombTime);
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
      {this.state.show && <View><Text style={[styles.timer, {color: this.state.color}]}>{this.state.bombDisplay}</Text>
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
    // color: 'red',
  }
});

export default Bomb