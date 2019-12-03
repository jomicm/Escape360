import React, { useState, Component } from 'react';
import { asset, StyleSheet, Image, Text, View, NativeModules } from 'react-360';
import { dataStore, inventoryViewer, componentsMgmt, registerComponent } from '../index';
const { AudioModule } = NativeModules;

export default class Outro extends Component {
  state = {
    show: false,
    bombDisplay: '00:00',
  }
  componentDidMount() {
    componentsMgmt.outro.state = this.state;
    componentsMgmt.outro.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.outro.state = this.state;
    }
  }

  render(){
  return (
    <View>
      { this.state.show && <View><Text style={styles.congrats}>CONGRATULATIONS!</Text>
      <Text style={styles.message}>You escaped with {this.state.bombDisplay} to spare</Text></View>}
    </View>
  )}
}

const styles = StyleSheet.create({
  message: {
    fontSize: 50,
    textAlign: 'center',
  },
  congrats: {
    fontSize: 100,
    alignItems: 'center',
  }
});