import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  VrButton,
  asset,
  StyleSheet
} from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';


export default class Ghost extends Component {

  state = {
    show: false,
    isSolved: false,
    message: 'tic tic tic',
    bombCode: '1 2 3 4'
  }

  componentDidMount = () => {
    componentsMgmt.ghost.state = this.state;
    componentsMgmt.ghost.setState = async (key, val) => {
      await this.setState({[key]: val});
    }
  }

  handleOnClick = () => {
    let message = this.state.bombCode;
    this.setState({message});
  }

  ghostMessage = () => {
    return this.state.message;
  }

  render = () => {
    return (
      <View>
        {(this.state.show && this.state.isSolved) && <View style={styles.container}>
          <View style={styles.children}>
            <VrButton onClick={this.handleOnClick}><View style={styles.button}></View></VrButton>
          </View>
          <View style={[styles.children, {flex: 2}]}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={asset('chatbox.png')}/>
              <Text style={styles.text}>{this.ghostMessage()}</Text>
            </View>
          </View>
        </View>}
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(59, 198, 140, 0.5)',
    width: 320,
    height: 400,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  children: {
    // borderColor: "#639dda",
    // borderWidth: 2,
    flex: 1,

  },
  button: {
    height: 310,
    width: 100,
    top: 75,
    // borderColor: "red",
    // borderWidth: 2,
    alignSelf: 'flex-end',
  },
  image: {
    width: 200,
    height: 130,
    transform: [{scaleX: -1}],
    // backgroundColor: 'rgba(255, 255, 255, 0.3)'

  },
  text: {
    position: 'absolute',
    fontSize: 35,
    fontWeight: 'bold',
    transform: [{translate: [28, -28, -9]}],
  }
})