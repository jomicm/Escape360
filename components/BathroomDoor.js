import React, { Component } from 'react';
import { asset, View, VrButton, StyleSheet, NativeModules } from 'react-360'
const { AudioModule } = NativeModules;
import { dataStore, componentsMgmt } from '../index';

export default class BathroomDoor extends Component {
  state = {
    show: false,
    canIGoThrough: false
  }
  componentDidMount() {
    componentsMgmt.bathroomDoor.state = this.state;
    componentsMgmt.bathroomDoor.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.bathroomDoor.state = this.state;
    }
  }
  _onBathroomDoorClick = (show) => {
    if (this.state.canIGoThrough) {
      // dataStore.emit('holeClick', show)
      // this.setState({show: false})
      dataStore.emit('globalListener', {name: 'bathroomDoor', action:'click'});
    } else {
      if (componentsMgmt.inventory.state.selectedItem === 'bathroomKey') {
        this.setState({canIGoThrough: true});
        // dataStore.emit('itemUsed', 'bathroomKey');
        dataStore.emit('globalListener', {name: 'onItemUsed', action: 'click', content: {item: 'bathroomKey', num: 1}});
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
        {this.state.show && <VrButton onClick={this._onBathroomDoorClick}>
          <View style={styles.container}/>
        </VrButton>}
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