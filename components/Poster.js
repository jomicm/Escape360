import React, { useState, Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';
import { dataStore, getPuzzleAnswers } from '../index';

class Poster extends Component {
  state = {
    show: true,
  }

  _onPosterClick = (show) => {
    const phoneNumBasement = getPuzzleAnswers().phoneNumBasement;
    dataStore.emit('posterClick', phoneNumBasement);
  }
  _onRopeClick = (show) => {
    this.setState({show: false})
  }

  _onHoleClick = (show) => {
    this.setState({show: true})
  }
  componentWillMount() {
    
    // this.setState({ phoneNumBasement })
    // console.log('puzzleAnswers! >>>>>>>>>>> ', phoneNumBasement);

    console.log('Mounting from poster.js!');
    dataStore.addListener('ropeClick', this._onRopeClick);
    dataStore.addListener('holeClick', this._onHoleClick);
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