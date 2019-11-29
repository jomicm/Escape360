import React, { Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View } from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';

class SimonDynamic extends Component {
  state = {
    show: false,
    opacity: { 0: 0.3, 1: 0.3, 2: 0.3, 3: 0.3 },
    colorCode: { 0: 'green', 1: 'red', 2: 'blue', 3: 'yellow'},
    simonCode: [],
    playerGuess: [],
    solved: false,
    message: 'BOOOO!!!',
  }

  componentDidMount = () => {
    componentsMgmt.simonDynamic.state = this.state;
    componentsMgmt.simonDynamic.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.simonDynamic.state = this.state;
    }
  }
  
  handlePress = async (id) => {
    this.setState(prevState => ({...prevState, opacity: { ...prevState.opacity, [id]: 1}}));
    setTimeout(() => {
      this.setState(prevState => ({...prevState, opacity: { ...prevState.opacity, [id]: 0.3}}));
    }, 200);
    if (id !== this.state.playerGuess[this.state.playerGuess.length - 1]) {
      this.state.playerGuess.push(id)
    }
    if (this.state.playerGuess.length === this.state.simonCode.length) {
      if (this.state.playerGuess.join('') === this.state.simonCode.join('')) {
        this.setState({solved: true})
        dataStore.emit('globalListener', {name: 'simonSolved', content: true});
      } else {
        this.setState({playerGuess: []});
        await this.setState({message: 'WRONG!!!'});
        setTimeout(() => { 
          [0, 1, 2, 3].map(x => {
            this.setState(prevState => ({...prevState, opacity: { ...prevState.opacity, [x]: 1}}));
          });
          setTimeout(async () => {
            [0, 1, 2, 3].map(x => {
              this.setState(prevState => ({...prevState, opacity: { ...prevState.opacity, [x]: 0.3}}));
            });
            await this.setState({message: 'BOOOO!!!'});
          },600);
        }, 201)
      }
    }
  }

  handleClick = () => {
    this.setState({playerGuess: []});
    [0, 1, 2, 3].map(x => {
      this.setState(prevState => ({...prevState, opacity: { ...prevState.opacity, [x]: 1}}));
    });
    setTimeout(async () => {
      [0, 1, 2, 3].map(x => {
        this.setState(prevState => ({...prevState, opacity: { ...prevState.opacity, [x]: 0.3}}));
      });
      await this.setState({message: 'BOOOO!!!'});
    },600);
  }

  render() {

    return (
      <View>
        {this.state.show && <View style={styles.container}>
          <View style={styles.blackCircle}>
          {[0, 1, 2, 3].map(x => {
            return(
              <VrButton onClick={() => this.handlePress(x)} onButtonRelease={() => {}}>
                <View style={[styles.quarter, styles[this.state.colorCode[x]], { opacity: this.state.opacity[x] }]}></View>
              </VrButton>
            )
          })}
          </View>
          {(this.state.message === 'WRONG!!!' ? true : false || this.state.solved) && <View style={styles.display}>
            <Text style={[styles.code, {color: this.state.solved ? 'white' : 'red'}]}>{this.state.message}</Text>
          </View>}
          <View>
            <VrButton onClick={this.handleClick}>
              <Image source={asset('reset.png')} style={styles.reset}/>
            </VrButton>
          </View>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
    // borderColor: "#639dda",
    // borderWidth: 2,
    height: 700,
    width: 700,
    // backgroundColor: 'rgba(35, 133, 200, 0.7)'
  },
  reset: {
    position: 'absolute',
    left: -320,
    top: -45,
    height: 75,
    width: 75,
  },
  blackCircle: {
    backgroundColor: "#262626",
    borderColor: "#131313",
    borderWidth: 2,
    height: 510,
    width: 510,
    top: 10,
    borderRadius: 130,
    flexWrap: 'wrap',
  },
  display: {
    position: 'absolute',
    top: 140,
    borderRadius: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#262626",
    borderColor: "#181818",
    height: 250,
    width: 250
  },
  code: {
    fontSize: 50,
  },
  quarter: {
    height: 255,
    width: 255,
  },
  green: {
    position: 'absolute',
    backgroundColor: 'lime',
    borderTopLeftRadius:170,
    transform: [
      { translate: [10, -10, 0] }
    ]
  },
  red: {
    position: 'absolute',
    backgroundColor: 'red',
    borderTopRightRadius: 170
    ,
    transform: [
      { translate: [240, -10, 0] }
    ]
  },
  blue: {
    position: 'absolute',
    backgroundColor: 'rgba(23,69,255,1)',
    borderBottomLeftRadius: 170
    ,
    transform: [
      { translate: [10, -240, 0] }
    ]
  },
  yellow: {
    position: 'absolute',
    backgroundColor: '#FFFF33',
    borderBottomRightRadius: 170
    ,
    transform: [
      { translate: [240, -240, 0] }
    ]
  },

});

export default SimonDynamic;