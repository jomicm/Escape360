import React, { Component } from 'react';
import { asset, View, VrButton, StyleSheet, NativeModules, Text, Image } from 'react-360'
const { AudioModule } = NativeModules;
import { dataStore, componentsMgmt } from '../../index';

export default class AbstractArtFixed extends Component {
  state = {
    show: true,
    solved: false
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
    console.log('From Abstract Art Fixed!!!');
    dataStore.emit('globalListener', {name: 'abstractArtFixed', action:'click'});
  }

  render() {
    return (
      <View style={{backgroundColor:'rgba(255,255,255,0.0)'}}>
        {this.state.show && <VrButton onClick={this._onGoBackDoorClick}>
          <View style={styles.container}/>
          {this.state.solved && <Image style={{width:130, height:180, left:40, top:-130}} source={asset('safe_closed.png')}/>}
        </VrButton>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(59, 198, 140, 0.5)',
    top:10,
    width: 220,
    height: 320,
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