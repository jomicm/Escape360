import React, { useState, Component, Fragment } from 'react';
import { asset, StyleSheet, Image, VrButton } from 'react-360';
import { dataStore, componentsMgmt } from '../index';

class BedroomSafe extends Component {
  state = {
    show: false,
    image: ['safe_closed.png', 'safe_opened.png'],
    index: 0,
    showItems: false,
    available: true,
  }

  _onBedroomSafeClick = (show) => {
    // dataStore.emit('bedroomSafeClick', show)
    if (this.state.available) dataStore.emit('globalListener', {name: 'bedroomSafe', action:'click'});
  }

  componentDidMount() {
    componentsMgmt.bedroomSafe.state = this.state;
    componentsMgmt.bedroomSafe.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.bedroomSafe.state = this.state;
    }
  }
  render() {
  return (
    <VrButton onClick={() => this._onBedroomSafeClick(true)}>
      {this.state.show && <Fragment>
        <Image style={[styles.safe, {width: !this.state.index ? 140 : 230, top: this.state.showItems ? 0 : .1}]} source={asset(this.state.image[this.state.index])}/>
        {(this.state.index === 1 && this.state.showItems) && <Image style={styles.rope} source={asset('bundle-rope.png')}/>}
        {/* {(this.state.index === 1 && this.state.showItems) && <Image style={styles.key} source={asset('key.webp')}/>}  */}
      </Fragment>}
    </VrButton>
  )}
}
//top: this.state.showItems ? 0 : 10
const styles = StyleSheet.create({
  safe: {
    // position: 'absolute',
    width:140, 
    height:200, 
    left:0, 
    top:0,
  },
  rope: {
    width: 80,
    height:50,
    top: -120,
    left: 25
  },
  // key: {
  //   width: 45,
  //   height:20,
  //   top: -110,
  //   left: 35
  // }
});

export default BedroomSafe;