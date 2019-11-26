import React, { Component } from 'react';
import {
  View,
  Image,
  VrButton,
  asset,
  Stylesheet
} from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';


export default class Ghost extends Component {

  state = {
    show: true,
    
  }

  componentDidMount = () => {
    componentsMgmt.ghost.state = this.state;
    componentsMgmt.ghost.setState = async (key, val) => {
      await this.setState({[key]: val});
    }
  }

  render = () => {
    return (
      <View>
        {this.state.show && <View style={styles.container}>
        </View>}
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(59, 198, 140, 0.5)',
    width: 400,
    height: 320
  }
})