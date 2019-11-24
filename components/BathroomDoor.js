import React, { Component } from 'react';
import { asset, View, VrButton, StyleSheet, NativeModule, AudioModule } from 'react-360'
import { dataStore, componentsMgmt } from '../index';

export default class BathroomDoor extends Component {
  state = {
    show: true,
    canIGoThrough: false
  }
  _onBathroomDoorClick = (show) => {
    if (this.state.canIGoThrough) {
      dataStore.emit('holeClick', show)
      this.setState({show: false})
    } else {
      if (componentsMgmt.inventory.state.selectedItem === 'bathroomKey') {
        this.setState({canIGoThrough: true});
        dataStore.emit('itemUsed', 'bathroomKey');
        // dataStore.emit('ropeSet', show);
        dataStore.emit('globalListener', {name: 'bathroomDoor', action:'click'});
      } else {
        AudioModule.playOneShot({
          source: asset('beep-error.mp3'),
          volume: 0.8,
        });
      }
    }
  }

  render() {
    return (
      <View >
        <VrButton onClick={this._onBathroomDoorClick}>
          <View style={styles.container}/>
        </VrButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(59, 198, 140, 0.5)',
    width: 300,
    height: 800
  }
})