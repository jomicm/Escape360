import React, { useState, Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';

class PosterBedroom extends Component {
  state = {
    show: false
  }

  _onPosterBedroomClick = (show) => {
    const phoneNumBedroom = getPuzzleAnswers().phoneNumBedroom;
    dataStore.emit('globalListener', {name: 'bedroomPoster', action:'click', content: phoneNumBedroom});
  }
  _onRopeClick = (show) => {
    this.setState({show: true})
  }

  _onHoleClick = (show) => {
    this.setState({show: false})
  }
  componentWillMount() {
    console.log('Mounting!');
    dataStore.addListener('ropeClick', this._onRopeClick);
    dataStore.addListener('holeClick', this._onHoleClick);
  }
  componentDidMount() {
    componentsMgmt.bedroomPoster.state = this.state;
    componentsMgmt.bedroomPoster.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.bedroomPoster.state = this.state;
    }
  }
  render() {
  return (
    <VrButton onClick={() => this._onPosterBedroomClick(true)}>
      {this.state.show && <Fragment><Image style={{width:130, height:180, left:0, top:0}} source={asset('poster.png')}/>
      <Text style={styles.text}>
        {`DO NOT CALL: \n\n### ### ####`}
      </Text></Fragment>}
    </VrButton>
  )}
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    top: -130,

  },
});

export default PosterBedroom;