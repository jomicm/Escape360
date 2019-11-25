import React, { Component } from 'react';
import { asset, View, VrButton, StyleSheet, NativeModules } from 'react-360'
const { AudioModule } = NativeModules;
import { dataStore, componentsMgmt } from '../../index';

export default class AbstractArtDynamic extends Component {
  state = {
    show: true
  }
  componentDidMount() {
    componentsMgmt.abstractArtDynamic.state = this.state;
    componentsMgmt.abstractArtDynamic.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.abstractArtDynamic.state = this.state;
    }
  }
  _onClick = (show) => {
    console.log('From Abstract Art Dynamic!!!');
    dataStore.emit('globalListener', {name: 'abstractArtDynamic', action:'click'});
  }

  render() {
    return (
      <View style={{backgroundColor:'rgba(255,255,255,0.5)'}}>
        {this.state.show && <VrButton onClick={this._onClick}>
          <View style={styles.container}/>
        </VrButton>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(59, 198, 140, 0.5)',
    top:10,
    width: 400,
    height: 420,
    flex: 1,
    // transform: [
    //   { perspective: 2500 },
    //   { translateX:  0 },
    //   { rotateY: '15deg'},
    //   { rotateX: '0deg'},
    //   { rotateZ: '5deg'},
    // ],
  }
})