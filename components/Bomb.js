import React, { useState, Component, Fragment, } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View, NativeModules } from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';
const { AudioModule } = NativeModules

class Bomb extends Component {
  state = {
    show: false,
    startTimer: (content) => this.timer(content.time),
    // bombTime: 1800000,
    bombDisplay: '30:00',
    color: 'red',
    // isRunning: false,
    isPowered: false,
    isDefused: false,
    interval: null,
    stopTimer: async() => {
      // this.setState({color:'red'});
      clearInterval(this.state.interval);
      await this.setState({color:'red'});
      console.log('BOMB DISPLAY', this.state.bombDisplay);
    }
  }

  timer = (initTime) => {
    const interval = setInterval(() => {
      let minutes = Math.floor(initTime / 60000).toFixed(0);
      minutes = minutes.length === 1 ? '0' + minutes : minutes
      let seconds = ((initTime / 1000) % 60).toFixed(0);
      seconds = seconds.length === 1 ? '0' + seconds : seconds
      
      if (initTime === 10000) {
        AudioModule.playOneShot({
          source: asset('warning-bomba.mp3'),
          volume: 0.4,
        })
      }
      if (initTime >= 1000) {
        this.setState({color: 'red'})
        initTime -= 1000;
        this.setState({bombDisplay: `${minutes}:${seconds}`})
        componentsMgmt.bomb.state = this.state;
        if (this.state.show) {
          AudioModule.playOneShot({
          source: asset('beep-bomb.mp3'),
          volume: 0.4,
        })
      };
        setTimeout(() => {
          this.setState({color: 'black'})
        }, 700)
      } else {
        this.setState({color: 'red'})
        this.setState({bombDisplay: '00:00'})
        componentsMgmt.bomb.state = this.state;
        // setTimeout(() => {
        //   this.setState({color: 'black'})
        // }, 700)
        setTimeout(() => {
          //silence for 3sec then explode. Endgame;
          dataStore.emit('globalListener', {name: 'bombTimeout', action: this.state.component});
        }, 5000)
        clearInterval(this.state.interval);
      }
    }, 1000);
    this.setState({interval});
  };

  _onBombClick = (show) => {
    if (this.state.isPowered) {
      dataStore.emit('globalListener', {name: 'safeKeyPadBomb', action:'click', content:'Bomb'});
      // dataStore.emit('globalListener', {name: 'safeKeyPadBomb', action:'click' });
    } else {
      if (componentsMgmt.inventory.state.selectedItem === 'battery') {
        this.setState({isPowered: true});
        dataStore.emit('globalListener', {name: 'onItemUsed', action: 'click', content: {item: 'battery', num: 1}});
        dataStore.emit('globalListener', {name: 'bombIsPowered', action:'click'});
      } else {
        AudioModule.playOneShot({
          source: asset('beep-error.mp3'),
          volume: 0.5,
        });
      }
    }
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
        <Image style={{width:500, height:250, left:0, top:0}} source={this.state.isPowered ? asset('bomb_power.jpg') : asset('bomb_nopower.jpg')}/>
        {this.state.isPowered? <Text style={styles.textPwr}>- PWR ON -</Text> : <Text style={styles.textNoPwr}>- PWR OFF -</Text>}
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
  },
  textPwr: {
    position: 'absolute',
    top: 170,
    left: 163,
    color: '#6FFF00'
  },
  textNoPwr: {
    position: 'absolute',
    top: 170,
    left: 163,
    color: '#333333'
  }
});

export default Bomb