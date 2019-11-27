import React, { Component } from 'react';
import {
  asset,
  Image,
  Text,
  View,
  VrButton,
  StyleSheet
} from 'react-360';
import { dataStore, componentsMgmt } from '../index';

export default class BlackHole extends Component {

  componentDidMount = () => {
    componentsMgmt.blackHole.state = this.state;
    componentsMgmt.blackHole.setState = async (key, val) => {
      await this.setState({[key]: val});
      componentsMgmt.blackHole.state = this.state;
    }

  }

  render = () => {
    return <View></View>
  }
}