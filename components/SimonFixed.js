import React, { Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View } from 'react-360';
import { dataStore, getPuzzleAnswers } from '../index';

class SimonFixed extends Component {
  state = {
    show: true,
    opacity: { 0: 0.3, 1: 0.3, 2: 0.3, 3: 0.3 }
  }

  onClick = () => {
    console.log('@@@@@@@@@@@@@@@@', getPuzzleAnswers())
    const simonCode = getPuzzleAnswers().simonCode;
    let simonCopy = [...simonCode];
    console.log(simonCopy)
    let opacity = {...this.state.opacity}
    const runSimon = (opacity) => {
      if (!this.state.show) return;
      if (simonCopy.length === 0) simonCopy = simonCode;
      setTimeout(() => {
        if (simonCopy[0] === 4) {
          console.log('special');
          Object.keys(opacity).map(o => {
            opacity[o] = 1
            this.setState({opacity})
          });
          console.log(opacity)
          setTimeout(() => {
            Object.keys(opacity).map(o => {
              opacity[o] = 0.3
              this.setState({opacity})
            });
            console.log(opacity);
          }, 1500);
        } else {
          console.log('index', simonCopy[0]);
          console.log('original op', opacity[simonCopy[0]]);
          opacity[simonCopy[0]] = 1
          this.setState({opacity});
          console.log('change op to 1', opacity[simonCopy[0]])
          setTimeout(() => {
            opacity[simonCopy[0]] = 0.3
            this.setState({opacity});
            console.log('change op back to 0.3', opacity[simonCopy[0]])
          }, 1500);
          simonCopy = simonCopy.splice(1, simonCopy.length);
        }
        runSimon(opacity)
      }, 3000);
    }
    runSimon(opacity)

  }
  render() {

    return (
      <View style={styles.container}>
        <VrButton onClick={this.onClick}>
          <View style={styles.blackCircle}></View>
          <View style={[styles.quarter, styles.green, { opacity: this.state.opacity[0] }]}></View>
          <View style={[styles.quarter, styles.red, { opacity: this.state.opacity[1] }]}></View>
          <View style={[styles.quarter, styles.blue, { opacity: this.state.opacity[2] }]}></View>
          <View style={[styles.quarter, styles.yellow, { opacity: this.state.opacity[3] }]}></View>
        </VrButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#639dda",
    // borderWidth: 2,
    height: 200,
    width: 200
  },
  blackCircle: {
    backgroundColor: "#262626",
    borderColor: "#131313",
    borderWidth: 2,
    height: 200,
    width: 200,
    borderRadius: 100,
    flexWrap: 'wrap',
  },
  quarter: {
    height: 70,
    width: 70,
    opacity: 0.3
  },
  green: {
    position: 'absolute',
    backgroundColor: 'lime',
    borderTopLeftRadius: 200,
    transform: [
      { translate: [-40, 40, 0] }
    ]
  },
  red: {
    position: 'absolute',
    backgroundColor: 'red',
    borderTopRightRadius: 200,
    transform: [
      { translate: [40, 40, 0] }
    ]
  },
  blue: {
    position: 'absolute',
    backgroundColor: 'rgba(23,69,255,1)',
    borderBottomLeftRadius: 200,
    transform: [
      { translate: [-40, -40, 0] }
    ]
  },
  yellow: {
    position: 'absolute',
    backgroundColor: '#FFFF33',
    borderBottomRightRadius: 200,
    transform: [
      { translate: [40, -40, 0] }
    ]
  },

});

// Fixed SimonS Surface
//  const simonFixedSurface = new Surface(200, 200, Surface.SurfaceShape.Flat);
//  simonFixedSurface.setAngle(-0.452, 0.035, 0);
//  r360.renderToSurface(r360.createRoot("SimonFixed", {}), simonFixedSurface);

export default SimonFixed;