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
        {this.state.show && 
        <View style={styles.container}>
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
    width: 200,
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mirrorText: {
    fontSize: 50,
    color: 'rgba(255, 255, 255, 0.4)'
  }
})