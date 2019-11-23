import React, { Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View, NativeModules } from 'react-360';
import Back from './Back'
// import { dataStore, puzzleAnswers } from '../index';
// import dataStore from '../index';
import { dataStore } from '../index';


import { phoneNum, phoneCode } from '../consts/puzzleAnswers';
// const { phoneNum, phoneCode } = puzzleAnswers;
const { AudioModule } = NativeModules;


export default class PhoneNumpad extends Component {
  state = {
    code: Array(10).fill('-'),
    codeNumbers: [],
    lastRow: ['call', 'clear'],
    len: 11,
    show: false
  }
  createPhoneCode = (num) => {
    let first = 500;
    phoneCode.map((x, ix) => {
      setTimeout(() => {
        for (let i = 0; i < x; i++) {
          setTimeout(() => {
            AudioModule.playOneShot({
              source: asset('beep.mp3'),
              volume: 1,
            });
            console.log('x')
          }, 400 * i);
        }
        console.log('pause')
      }, first);
      first += (500 * x) + 700;
    });
    console.log('pC', phoneCode.join(''))
  }
  setCode = (c) => {
    console.log('c', c);

    let codeNumbers = [... this.state.codeNumbers];
    codeNumbers.push(c);
    if (codeNumbers.length === this.state.len) codeNumbers = [];
    this.setState({ codeNumbers });
  }
  _onPhoneClick = (show) => {
    // dataStore.emit('ropeClick', show)
    console.log('this is numbers')
    this.setState({show: true})
  }
  _onActionButton = sender => {
    if (sender === 'call') {
      if (this.state.codeNumbers.join('') === phoneNum) {
        this.createPhoneCode();
      } else {
        console.log('wrong answer motherfuckeeeeeer')
      }

    } else if (sender === 'clear') {
      this.setState({codeNumbers: []})
    }
  }
  componentWillMount() {
    console.log('Mounting numbers!');
    dataStore.addListener('phoneClick', this._onPhoneClick);
  }
  render() {
    if (this.state.show) {
      return (
        <View style={[styles.container, styles.text, {width:this.props.width, height: this.props.height}]}>
          <Text style={styles.textSize}>
            { this.state.code.map((n, ix) => this.state.codeNumbers[ix] !== undefined ? this.state.codeNumbers[ix] + ' ' : n + ' ' ).join('')}
          </Text>
            {[1, 4, 7].map((x, ix) => <NumRow key={'num' + ix} initial={x} setCode={this.setCode} cols={3}/>)}
            {[0].map((x, ix) => <NumRow key={'zero' + ix} initial={x} setCode={this.setCode} cols={1}/>)}
            <View style={{display:'flex', flexDirection:'row'}}>
              {this.state.lastRow.map((x, ix) => (
                  <VrButton key={'vrbutton' + ix} style={styles.actionButtons} onClick={() => this._onActionButton(x)}>
                    <Text style={styles.textSize}>{x}</Text>
                  </VrButton>
              ))}
            </View>
            <Back onClick={() => this.setState({show: false})}/>
        </View>
      )
    } else {
      return <View></View>
    }
  }
}

const NumRow = (props) => {
  const nums = Array(props.cols).fill(0);
  handleClick = (ix, init) => {
    props.setCode(ix + init);
    AudioModule.playOneShot({ source: asset('menu-click.wav'), volume: 1 });
  }

  return (
    <View style={{display:'flex', flexDirection:'row', padding:5}}>
      {nums.map((n, ix) => 
          <VrButton key={ix} style={styles.text} onClick={() => handleClick(ix, props.initial)}>
            <Text style={styles.textSize}>{ix + props.initial}</Text>
          </VrButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#639dda",
    borderWidth: 2,
    backgroundColor: 'black'
  },
  text: {
    padding:25,
    paddingLeft:40,
    paddingRight:40, 
    marginLeft:40, 
    marginRight:40,
    borderColor: "#639dda",
    borderWidth: 2
  },
  textSize: {
    fontSize: 50
  },
  actionButtons: {
    marginTop: 20, 
    paddingLeft: 150, 
    paddingRight: 150
  }
})