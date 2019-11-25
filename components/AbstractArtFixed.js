import React, { Component } from 'react';
import { asset, View, VrButton, StyleSheet, NativeModules } from 'react-360'
const { AudioModule } = NativeModules;
import { dataStore, componentsMgmt } from '../index';

export default class AbstractArtFixed extends Component {
  state = {
    show: true
  }
  componentDidMount() {
    componentsMgmt.abstractArtFixed.state = this.state;
    componentsMgmt.abstractArtFixed.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.abstractArtFixed.state = this.state;
    }
  }
  _onGoBackDoorClick = (show) => {
    // dataStore.emit('globalListener', {name: 'changeEnvironment', action:'click', content: this.props.room});
    console.log('From Abstract Art!!!');
  }

  render() {
    return (
      <View >
        {this.state.show && <VrButton onClick={this._onGoBackDoorClick}>
          <View style={styles.container}/>
        </VrButton>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(59, 198, 140, 0.5)',
    width: 400,
    height: 320
  }
})