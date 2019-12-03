import React, { Component } from 'react';
import { asset, View, VrButton, StyleSheet, Image, Text } from 'react-360'
import { dataStore, componentsMgmt } from '../../index';

export default class MirrorCode extends Component {
  state = {
    show: false,
    mirrorCode: 'XXXX'
  }
  componentDidMount() {
    componentsMgmt.mirrorCode.state = this.state;
    componentsMgmt.mirrorCode.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.mirrorCode.state = this.state;
    }
  }
  _onClick = (show) => {
    console.log('From Abstract Art Dynamic!!!');
    dataStore.emit('globalListener', {name: 'abstractArtDynamic', action:'click'});
  }

  render() {
    return (
      <View style={{backgroundColor:'rgba(255,255,255,0.0)'}}>
        {this.state.show && <View style={styles.container}>
          <Text style={styles.clueText}>Art is not always as it seems</Text>
          <Text style={styles.mirrorText}>{this.state.mirrorCode}</Text>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(59, 198, 140, 0.0)',
    top:10,
    width: 700,
    height: 300,
    alignItems: 'center',
  },
  mirrorText: {
    textAlign: 'left',
    fontSize: 50,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  clueText: {
    fontSize: 50,
    color: 'rgba(0, 0, 0, 0.5)',
    transform: [
      {translateY: 10},
      {rotateZ: 4}
    ]
  }
})