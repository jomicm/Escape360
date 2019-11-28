import React, { useState, Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';

class Poster extends Component {
  state = {
    show: false,
  }

  _onPosterClick = (show) => {
    const phoneNumBasement = getPuzzleAnswers().phoneNumBasement;
    dataStore.emit('globalListener', {name: 'basementPoster', action:'click', content: phoneNumBasement});
    // console.log('AUDIOOOOO WINDOW>', window.AudioContext);
  }
  // _onRopeClick = (show) => {
  //   this.setState({show: false})
  // }

  // _onHoleClick = (show) => {
  //   this.setState({show: true})
  // }
  componentWillMount() {
    
    // this.setState({ phoneNumBasement })
    // console.log('puzzleAnswers! >>>>>>>>>>> ', phoneNumBasement);

    console.log('Mounting from poster.js!');
    dataStore.addListener('ropeClick', this._onRopeClick);
    dataStore.addListener('holeClick', this._onHoleClick);
  }
  componentDidMount() {
    componentsMgmt.basementPoster.state = this.state;
    componentsMgmt.basementPoster.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.basementPoster.state = this.state;
    }
  }
  render() {
  return (
    <VrButton onClick={() => this._onPosterClick(true)}>
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

export default Poster;

// class Robot extends Component {
//   render() {
//     return (
//       <VrButton onClick={() => console.log('Robot kill bunnies!')} onMouseOver={() => console.log('Robot kill bunnies Enter!')}>
//         <Image style={{width:130, height:180, left:0, top:0}} source={asset('robot.png')}/>
//       </VrButton>
//     );
//   }
// }

// export default Poster;