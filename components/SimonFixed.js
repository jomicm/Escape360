import React, { Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View } from 'react-360';
import dataStore from '../index';
import { phoneNumBedroom } from '../consts/puzzleAnswers';

class SimonFixed extends Component {


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.blackCircle}>
        </View>
        <View style={[styles.quarter, styles.green]}></View>
        <View style={[styles.quarter, styles.red]}></View>
        <View style={[styles.quarter, styles.blue]}></View>
        <View style={[styles.quarter, styles.yellow]}></View>
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
      {translate: [-40, 40, 0]}
    ]
  },
  red: {
    position: 'absolute',
    backgroundColor: 'red',
    borderTopRightRadius: 200,
    transform: [
      {translate: [40, 40, 0]}
    ]
  },
  blue: {
    position: 'absolute',
    backgroundColor: 'rgba(23,69,255,1)',
    borderBottomLeftRadius: 200,
    transform: [
      {translate: [-40, -40, 0]}
    ]
  },
  yellow: {
    position: 'absolute',
    backgroundColor: '#FFFF33',
    borderBottomRightRadius: 200,
    transform: [
      {translate: [40, -40, 0]}
    ]
  },

});

 // Fixed SimonS Surface
//  const simonFixedSurface = new Surface(200, 200, Surface.SurfaceShape.Flat);
//  simonFixedSurface.setAngle(-0.452, 0.035, 0);
//  r360.renderToSurface(r360.createRoot("SimonFixed", {}), simonFixedSurface);

export default SimonFixed;