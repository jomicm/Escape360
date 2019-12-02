import React, { Component, Fragment } from 'react';
import { asset, StyleSheet, Image, Text, VrButton, View, NativeModules } from 'react-360';
import Back from './Back'
import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';

const { AudioModule } = NativeModules;

export default class PhoneNumpad extends Component {
  state = {
    code: Array(10).fill('-'),
    codeNumbers: [],
    lastRow: ['call', 'clear', 'delete'],
    len: 11,
    show: false,
    isRunning: false,
  }
  createPhoneCode = (num) => {
    if (this.state.isRunning) {
      return;
    }
    this.setState({isRunning: true})
    AudioModule.playOneShot({
      source: asset('ty-safepin.mp3'),
      volume: 1,
    });
    let first = 500;
    setTimeout(() => {
      getPuzzleAnswers().phoneCode.map((x, ix) => {
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
    }, 7500);
    setTimeout(() => this.setState({isRunning: false}), first);
    console.log('pC', getPuzzleAnswers().phoneCode.join(''))
  }
  setCode = (c) => {
    console.log('c', c);
    let codeNumbers = [... this.state.codeNumbers];
    if (codeNumbers[codeNumbers.length - 1] === c) return;
    codeNumbers.push(c);
    if (codeNumbers.length === this.state.len) codeNumbers = [];
    this.setState({ codeNumbers });
  }

  _onActionButton = sender => {
    if (sender === 'call') {
      console.log('this.state.codeNumbers.join', this.state.codeNumbers.join(''));
      console.log('getPuzzleAnswers().phoneNum', getPuzzleAnswers().phoneNum);
      if (this.state.codeNumbers.join('') === getPuzzleAnswers().phoneNum) {
        this.createPhoneCode();
      } else {
        console.log('wrong answer motherfuckeeeeeer')
        AudioModule.playOneShot({ source: asset('wrong_answer.m4a'), volume: 1 });
      }
    } else if (sender === 'clear') {
      this.setState({codeNumbers: []})
    } else if (sender === 'delete') {
      let delCodeNumbers = [...this.state.codeNumbers];
      delCodeNumbers.splice(-1, 1);
      console.log(this.state.codeNumbers)
      this.setState(prevState => ({...prevState, codeNumbers: delCodeNumbers}));
    }
  }
  onHandleClick = () => {
    this.setState({show: false})
    dataStore.emit('globalListener', {name: 'phoneNumpad', action:'click'});
  }
  componentWillMount() {
    console.log('Mounting numbers!');
    dataStore.addListener('phoneClick', this._onPhoneClick);
  }
  componentDidMount() {
    componentsMgmt.phoneNumpad.state = this.state;
    componentsMgmt.phoneNumpad.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.phoneNumpad.state = this.state;
    }
  }
  render() {
    if (this.state.show) {
      return (
        <View style={[styles.container, styles.text, {width:this.props.width, height: this.props.height}]}>
          <Back onClick={this.onHandleClick}/>
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
    fontSize: 40
  },
  actionButtons: {
    marginTop: 20, 
    paddingLeft: 100, 
    paddingRight: 100
  }
})