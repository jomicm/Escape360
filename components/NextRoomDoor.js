import React, { Component } from 'react';
import { asset, View, VrButton, StyleSheet, NativeModules } from 'react-360'
const { AudioModule } = NativeModules;
import { dataStore, componentsMgmt } from '../index';

// props > component, selectedItem
export default class NextRoomDoor extends Component {
  state = {
    show: false,
    canIGoThrough: false,
  }
  componentDidMount() {
    componentsMgmt[this.props.component].state = this.state;
    componentsMgmt[this.props.component].setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt[this.props.component].state = this.state;
    }
  }
  _onNextRoomDoorClick = (show) => {
    console.log('this.props.component>?>>>', this.props.component);
    console.log('this.props.selectedItem', this.props.selectedItem);
    if (this.state.canIGoThrough) {
      dataStore.emit('globalListener', {name: 'changeEnvironment', action:'click', content: this.props.room});

    } else {
      if (componentsMgmt.inventory.state.selectedItem === this.props.selectedItem) {
        this.setState({canIGoThrough: true});
        dataStore.emit('globalListener', {name: 'onItemUsed', action: 'click', content: {item: this.props.selectedItem, num: 1}});
        dataStore.emit('globalListener', {name: 'changeEnvironment', action:'click', content: this.props.room});
        dataStore.emit('globalListener', {name: 'openNextDoorRoom', action:'click', content: this.props.component});

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
        {this.state.show && <VrButton onClick={this._onNextRoomDoorClick}>
          <View style={styles.container}>
            <View style={[styles.dot, 
              {right: this.props.room === 'bathroom' ? 94 : 17,
              top: this.props.room === 'bathroom' ? 49 : 45,
              height: this.props.room === 'bathroom' ? 8 : 10,
              width: this.props.room === 'bathroom' ? 8 : 10,
              backgroundColor: this.state.canIGoThrough === true ? 'green' : 'red'
              }]}/>
          </View>
        </VrButton>}
      </View>
    )
  }
}
// {this.state.show && <VrButton onClick={this._onNextRoomDoorClick}>

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(59, 198, 140, 0)',
    width: 300,
    height: 800
  },
  dot: {
    position: 'absolute',
    height: 10,
    width: 10,
    borderRadius: 50,
  }
})