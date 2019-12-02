"use strict";

import React, { Component } from "react";
import { asset, StyleSheet, Text, View, Image, VrButton } from "react-360";
import { dataStore, componentsMgmt, registerComponent } from '../index';

class BigPoster extends Component {
  state = {
    fixedMessage: 'DO NOT CALL',
    message: '',
    show: false,
  };

  handleClick = () => {
    this.setState({show: false});
    dataStore.emit('globalListener', {name: 'bigPoster', action:'click'});
  };
  componentDidMount() {
    console.log('>>>>>>>>>>> componentsMgmt', componentsMgmt);
    // registerComponent(componentsMgmt, 'bigPoster', this.state, this.setState);
    //registerComponent(componentsMgmt, 'bigPoster', this);

    componentsMgmt.bigPoster.state = this.state;
    componentsMgmt.bigPoster.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.bigPoster.state = this.state;
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
            <Text style={styles.text}>{this.state.message}</Text>
          </VrButton>
        </View>
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderColor: "#639dda",
    borderWidth: 2
  },
  poster: {
    left: 0,
    top: 80
  },
  text: {
    fontSize: 50,
    color: "white",
    textAlign: "center",
    top: -400
  }
});

// module.exports = BigPoster;
export default BigPoster;
