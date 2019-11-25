import React, { Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View } from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';

class SimonDynamic extends Component {
  state = {
    show: true,
    opacity: { 0: 0.3, 1: 0.3, 2: 0.3, 3: 0.3 },
    simonCode: [],
    colorCode: { 0: 'green', 1: 'red', 2: 'blue', 3: 'yellow'},
    solved: false
  }

  componentDidMount = () => {
    componentsMgmt.simonDynamic.state = this.state;
    componentsMgmt.simonDynamic.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.simonDynamic.state = this.state;
    }
  }
  
  handlePress = (id) => {
    // let opacity = {...this.state.opacity}
    // opacity[id] = 1;
    this.setState(prevState => ({...prevState, opacity: { ...prevState.opacity, [id]: 1}}));
    setTimeout(() => {
      // opacity[id] = 0.3;
      // this.setState({opacity});
      this.setState(prevState => ({...prevState, opacity: { ...prevState.opacity, [id]: 0.3}}));
    }, 200)
    console.log('onreleasseee...uuugh id===>', id)
  }

  render() {

    return (
      <View>
        {this.state.show && <View style={styles.container}>
          <View style={styles.blackCircle}>
          {[0, 1, 2, 3].map(x => {
            return(
              
              <VrButton onClick={() => this.handlePress(x)} onButtonRelease={() => {console.log('please work')}}>
                <View style={[styles.quarter, styles[this.state.colorCode[x]], { opacity: this.state.opacity[x] }]}></View>
              </VrButton>
            )
          })}
          </View>
          {this.state.solved && <View style={styles.display} />}
        </View>}
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
    height: 600,
    width: 600
  },
  blackCircle: {
    backgroundColor: "#262626",
    borderColor: "#131313",
    borderWidth: 2,
    height: 510,
    width: 510,
    borderRadius: 130,
    flexWrap: 'wrap',
  },
  display: {
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