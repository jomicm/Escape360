import React, { Component } from 'react';
import { asset, View, VrButton, StyleSheet, NativeModules, Text, Image } from 'react-360'
const { AudioModule } = NativeModules;
import { dataStore, componentsMgmt } from '../../index';

export default class AbstractArtFixed extends Component {
  state = {
    show: true,
    solved: false,
    safe_closed: true,
    safe_image: ['safe_wall_close.png', 'safe_wall_open.png'],
    index: 0,
    showItems: false,
    available: true,
  }
  componentDidMount() {
    componentsMgmt.abstractArtFixed.state = this.state;
    componentsMgmt.abstractArtFixed.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.abstractArtFixed.state = this.state;
    }
  }
  _onAbstractArtClick = (show) => {
    console.log('From Abstract Art Fixed!!!');
    if (this.state.available) dataStore.emit('globalListener', {name: 'abstractArtFixed', action:'click', content:{isSolved: this.state.solved}});
  }

  render() {
    const safeToRender = this.state.safe_image[this.state.index];
    const safeSize = this.state.safe_closed ? { width:150, height:120 } : { width:200, height:170, top: 10, left:-20 };
    return (
      <View style={{backgroundColor:'rgba(255,255,255,0.0)'}}>
        {this.state.show && <VrButton onClick={this._onAbstractArtClick}>
          <View style={styles.container}>
            {this.state.solved && <Image style={[styles.safeClosed, safeSize]} source={asset(safeToRender)}/>}
            {!this.state.solved && <Image style={styles.poster} source={asset("art.jpg")}/>}
            { this.state.showItems && 
              <View>
                <Image style={styles.key} source={asset('key_vertical.png')}/>
                <Image style={styles.battery} source={asset('battery.png')}/>
              </View>
            }
          </View>
        </VrButton>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(59, 198, 140, 0.0)',
    top:10,
    width: 380,
    height: 350,
    flex: 1,
    // transform: [
      // { perspective: 2500 },
      // { translateX:  0 },
      // { rotateY: 55},
      // { rotateX: '0deg'},
      // { rotateZ: '-15deg'},
    // ],
  },
  safeClosed: {
    left:0, 
    top:20,
    transform: [ { rotateZ: '-1deg'}],
  },
  poster: {
    left: 0,
    width: 380, 
    height: 350
  },
  key: {
    width: 60,
    height:30,
    top: -100,
    left: 45
  },
  battery: {
    width: 70,
    height: 55,
    top: -85,
    left: 40,
    transform: [ { rotateZ: '-90deg'}],
  }
})