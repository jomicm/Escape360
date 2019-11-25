"use strict";

import React, { Component } from "react";
import { asset, StyleSheet, Text, View, Image, VrButton } from "react-360";
import { dataStore, componentsMgmt, registerComponent, getPuzzleAnswers } from '../../index';

class BigPoster extends Component {
  state = {
    coords: [],
    fixedMessage: 'DO NOT CALL',
    message: 'sdsdsadsasadsd',
    show: false,
  };

  handleClick = () => {
    this.setState({show: false});
    // dataStore.emit('globalListener', {name: 'bigPoster', action:'click'});
  };
  componentWillMount() {
    
    // setTimeout(() => this.setState({coords: getPuzzleAnswers().puzzleAbstractArt}), 500);
  }
  componentDidMount() {
    console.log('>>>>>>>>>>> componentsMgmt', componentsMgmt);
    componentsMgmt.bigAbstractArt.state = this.state;
    componentsMgmt.bigAbstractArt.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.bigAbstractArt.state = this.state;
    }
  }
  render() {
    return (
      <View> 
        {this.state.show && (
        <View style={[styles.container,{ width: this.props.width, height: this.props.height }]}>
          <VrButton onClick={this.handleClick}>
            <Image
              style={[
                styles.poster,
                {
                  width: this.props.height * 0.25,
                  height: this.props.height * 0.3
                }
              ]}
              source={asset("poster.png")}
            />
            {/* <Text style={styles.text}>{this.state.message}</Text> */}
            <Board width={5} height={5} coords={this.state.coords}/>
          </VrButton>
        </View>
      )}
      </View>
    );
  }
}

function Tile(props) {
  const index = props.len * props.start + props.id;
  const backColor = ['white', 'red', 'blue', 'yellow'];
  const val = props.coords[index];
  return (
    <View style={[styles.tile, {backgroundColor:backColor[val + 1]}]}>
      {/* <Text>{props.len * props.start + props.id}</Text> */}
      <Text>{val}</Text>
    </View>
  )
}
function Row(props) {
  const _len = Array(props.width).fill(0);
  return (
    <View style={styles.row}>
      {_len.map((t, ix) => <Tile coords={props.coords} start={props.start} len={props.len} id={ix} key={'tile' + ix} text={'XXX'}/>)}
    </View>
  )
}
function Board(props) {
  const _len = Array(props.height).fill(0);
  return(
    <View style={styles.board}>
      {_len.map((r, ix) => <Row coords={props.coords} len={props.width} start={ix} key={'row' + ix} width={props.width}/>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    top:180,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#639dda",
    borderWidth: 2
  },
  poster: {
    left: 0,
    // top: 50
  },
  text: {
    fontSize: 50,
    color: "black",
    textAlign: "center",
    top: -400
  },
  board: {
    top: -500,
    left: 100,
  },
  row: {
    flexDirection: 'row'
  },
  tile: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2
  }
});

// module.exports = BigPoster;
export default BigPoster;
