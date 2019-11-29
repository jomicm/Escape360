import React, { Component } from 'react';
import {
  View,
  VrButton,
  Image,
  asset,
  StyleSheet,
} from 'react-360';
import { dataStore, componentsMgmt } from '../index';

export default class Crowbar extends Component {

  state = {
    show: true,
  }

  componentDidMount = () => {
    componentsMgmt.crowbar.state = this.state;
    componentsMgmt.crowbar.setState = async (key, val) => {
      await this.setState({[key]: val});
      componentsMgmt.crowbar.state = this.setState;
    }
  }

  handleClick = () => {
    this.setState({show: false})
  }

  render = () => {
    return (
      <View style={styles.container}>
        {this.state.show && <VrButton onClick={this.handleClick}>
          <Image style={styles.image} source={asset('crowbar.png')}/>
        </VrButton>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(222, 222, 222, 0.5)',
    // borderColor: "#639dda",
    // borderWidth: 2,
    height: 250,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 150,
    width: 150,
    transform: [
      {scaleY: -1},
      {rotateZ: -15}
    ]
  }
})