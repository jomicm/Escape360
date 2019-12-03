import React, { useState, Component } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, NativeModules, View } from 'react-360';
import { dataStore, inventoryViewer, componentsMgmt } from '../index';
const { AudioModule } = NativeModules;
import Button from '../src/components/MediaAppTemplateInfoButton.react';

export default class Introduction extends Component {
  state = {
    play: false,
    show: false,
    volume: 1
  }
  componentDidMount() {
    componentsMgmt.introduction.state = this.state;
    componentsMgmt.introduction.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.introduction.state = this.state;
    }
    //if (this.state.play) {
      // AudioModule.playOneShot({ source: asset('intro.mp3'), volume: this.state.volume, autoPlay: true });
      // AudioModule.createAudio('introAudio', { source: asset('intro.mp3'), volume: 1, autoPlay: true })
      // AudioModule.play('introAudio');
      // setTimeout(() => this.setState({ show: false }), 55000);
    //};
    this.setState({play: true})
    setTimeout(() => {
      if (this.state.play) this.setState({play: false})
    }, 30000)
  }
  _playIntro = () => {
    setTimeout(() => {
      this.setState({play: false})
      AudioModule.createAudio('introAudio', { source: asset('intro.mp3'), volume: 1 })
      AudioModule.play('introAudio');
      console.log('AudioModule', AudioModule);
      this.setState({show: true})
      console.log('estas escuchando omeeee????????????????')
      setTimeout(() => this.setState({show: false}), 55000);
    }, 1000)
    // setTimeout(() => this.setState({ show: false }), 5500);
  };

  _onSkipClick = () => {
    // this.setState({volume: 0});
    AudioModule.stop('introAudio');
    console.log("hellooooo can you hear me?");
    this.setState({show: false});
    // AudioModule.playOneShot({ source: asset('intro.mp3'), volume: 0.5 });
  };

  render() {
  //this._playIntro();
  return (
    <View>
      { this.state.show && <Button text='Skip Intro' onClick={this._onSkipClick}/> }
      { this.state.play && <Button text='Play Intro' onClick={this._playIntro}/> }
    </View>
  )}
}


      {/* <VrButton onClick={() => this._onPlayClick()}>
        <Text>Hello!</Text>
      </VrButton> */}
