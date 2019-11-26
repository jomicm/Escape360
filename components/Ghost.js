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
    show: true,
    isClicked: true,
    
  }

  componentDidMount = () => {
    componentsMgmt.ghost.state = this.state;
    componentsMgmt.ghost.setState = async (key, val) => {
      await this.setState({[key]: val});
    }
  }

  handleOnClick = () => {
    console.log('BOOOOOOOO from Casper the ghost!!');
  }

  ghostMessage = () => {
    return 'BOOOOOOOO from Casper the ghost!!';
  }

  render = () => {
    return (
      <View>
        {this.state.show && <View style={styles.container}>
          <View style={styles.children}>
            <VrButton onClick={this.handleOnClick}><View style={styles.button}></View></VrButton>
          </View>
          <View style={[styles.children, {flex: 2}]}>
            {this.state.isClicked && <View>
              <Image style={styles.image} source={asset('chatbox.png')}/>
              {/* <Text style={styles.text}>{this.ghostMessage()}</Text> */}
            </View>}
          </View>
        </View>}
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(59, 198, 140, 0.5)',
    width: 250,
    height: 350,
    flex: 1,
    flexDirection: 'row',
  },
  children: {
    // borderColor: "#639dda",
    // borderWidth: 2,
    flex: 1.5,

  },
  button: {
    height: 350,
    borderColor: "red",
    borderWidth: 2,
  },
  image: {
    width: 125,
    height: 80,
    transform: [{scaleX: -1}],
  },
  text: {
    fontSize: 50
  }
})