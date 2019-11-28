import React, { useState, Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';
// import dataStore from '../index';

export default class Back extends Component {
  state = {  }
  render() {
  return (
    <VrButton style={styles.backButton} onClick={this.props.onClick}>
      <Text style={{fontWeight: 'bold', fontSize: 40}}>{'< Back'}</Text>
    </VrButton>
  )}
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 150,
    height: 50,
    borderRadius: 10
  }
});