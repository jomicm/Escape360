import React, { Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View } from 'react-360';
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';

class SimonFixed extends Component {
  state = {
    show: false,
    opacity: { 0: 0.3, 1: 0.3, 2: 0.3, 3: 0.3 },
    isRunning: false,
    startFunction: async () => {
      await this.setState({show: true})
      this.simonOnRender()
    }
  }

  componentDidMount = () => {
    componentsMgmt.simonFixed.state = this.state;
    componentsMgmt.simonFixed.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.simonFixed.state = this.state;
    }
  }
  
  simonOnRender = () => {
    // if (this.state.isRunning) {
    //   return;
    // }
    // this.setState({isRunning: true})
    let getPuzzleAnswer = {...getPuzzleAnswers()}
    let simonCode = [...getPuzzleAnswer.simonCode];
    // dataStore.emit('globalListener', {name: 'all', content: {name: 'simonAnswers', key: 'simonCode', value: 'simonCode.slice(0, 10)'}})
    // dataStore.emit('globalListener', {name: 'all', content: {name: 'simonAnswers', key: 'bombCode', value: 'getPuzzleAnswer.bombCode.join("")'}})
    dataStore.emit('globalListener', {name: 'simonAnswers', content: {simonCode: simonCode.slice(0, 10), bombCode: getPuzzleAnswer.bombCode.join('')}})
    let simonCopy = [...simonCode];
    let opacity = {...this.state.opacity};
    const runSimon = (opacity) => {
      console.log('this is running simon!!!!!!\n\n\n\nokayy!')
      if (!this.state.show) return;
      console.log('@@@@@@@@@@@@@@@@@this may not work\n\n\nplease')
      if (simonCopy.length === 0) {
        simonCopy = [...simonCode]
      }
      setTimeout(() => {
        if (simonCopy[0] === 4) {
          Object.keys(opacity).map(o => {
            opacity = {...this.state.opacity};
            opacity[o] = 1;
            this.setState({opacity})
          });
          setTimeout(() => {
            opacity = {...this.state.opacity }
            Object.keys(opacity).map(o => {
              opacity[o] = 0.3
              this.setState({opacity})
            });
          }, 700);
        } else {
          opacity = {...this.state.opacity }
          opacity[simonCopy[0]] = 1
          this.setState({opacity});
          setTimeout(() => {
            opacity = {...this.state.opacity }

            Object.keys(opacity).map(o => {
              opacity[o] = 0.3
              this.setState({opacity})
            });
          }, 700);
        }
        simonCopy = simonCopy.splice(1, simonCopy.length);
        runSimon(opacity)
      }, 1400);
    }
    runSimon(opacity)
  }

  handleClick = () => {

  }

  render() {

    return (
      <View>
        {this.state.show && <View style={styles.container}>
          <VrButton onClick={this.handleClick}>
            <View style={styles.blackCircle}></View>
            <View style={[styles.quarter, styles.green, { opacity: this.state.opacity[0] }]}></View>
            <View style={[styles.quarter, styles.red, { opacity: this.state.opacity[1] }]}></View>
            <View style={[styles.quarter, styles.blue, { opacity: this.state.opacity[2] }]}></View>
            <View style={[styles.quarter, styles.yellow, { opacity: this.state.opacity[3] }]}></View>
          </VrButton>
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
    height: 200,
    width: 200
  },
  blackCircle: {
    backgroundColor: "#262626",
    borderColor: "#131313",
    borderWidth: 2,
    height: 185,
    width: 185,
    borderRadius: 50,
    flexWrap: 'wrap',
  },
  quarter: {
    height: 90,
    width: 90,
    opacity: 0.3
  },
  green: {
    position: 'absolute',
    backgroundColor: 'lime',
    borderTopLeftRadius: 200,
    transform: [
      { translate: [5, -5, 0] }
    ]
  },
  red: {
    position: 'absolute',
    backgroundColor: 'red',
    borderTopRightRadius: 200,
    transform: [
      { translate: [90, -5, 0] }
    ]
  },
  blue: {
    position: 'absolute',
    backgroundColor: 'rgba(23,69,255,1)',
    borderBottomLeftRadius: 200,
    transform: [
      { translate: [5, -90, 0] }
    ]
  },
  yellow: {
    position: 'absolute',
    backgroundColor: '#FFFF33',
    borderBottomRightRadius: 200,
    transform: [
      { translate: [90, -90, 0] }
    ]
  },

});

export default SimonFixed;