import React, { useState, Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';
// import dataStore from '../index';

export default class Back extends Component {
  state = {
    show: true
  }
  render() {
  return (
    <VrButton style={{}} onClick={this.props.onClick}>
      <Text style={{fontSize:50}}>{"<"}</Text>
    </VrButton>
  )}
}