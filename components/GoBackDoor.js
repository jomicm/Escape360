import React, { Component } from 'react';
import { asset, View, VrButton, StyleSheet, NativeModules } from 'react-360'
const { AudioModule } = NativeModules;
import { dataStore, componentsMgmt } from '../index';

export default class GoBackDoor extends Component {
  state = {
    show: false
  }
  componentDidMount = () =>{
    componentsMgmt[this.props.component].state = this.state;
    componentsMgmt[this.props.component].setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt[this.props.component].state = this.state;
    }
  }
  _onGoBackDoorClick = (show) => {
    dataStore.emit('globalListener', {name: 'changeEnvironment', action:'click', content: this.props.room});
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