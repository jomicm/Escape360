"use strict";

import React, { Component } from "react";
import { asset, StyleSheet, Text, View, Image, VrButton} from "react-360";
import dataStore from '../index';

class Inventory extends Component {
  state = {
    inventoryShow: false, 
    inventoryItems: { 
      1: 'bunny.png',
      2: 'bunny.png'
    }
  };

  handleClick = () => {
    console.log('backpack clicked')
    this.setState({inventoryShow: this.state.inventoryShow === true ? false : true});
  };
  _onActionButton = () => {
    console.log('inventory item clicked')
  }
  render() {
    return (
      <View style={[styles.container,{ width: this.props.width, height: this.props.height }]}>
        <VrButton onClick={this.handleClick}>
          <Image
            style={[styles.backpack, {top: -(this.props.height / 3.3)}]}
            source={asset("backpack.png")}
          />
        </VrButton>
        {this.state.inventoryShow && 
        Object.values(this.state.inventoryItems).map((x, ix) =>
        <VrButton key={'item' + ix} onClick={() => this._onActionButton()}>
          <Image style={[styles.backpack, styles.text, {top: -(this.props.height / 3.3), height: 100, width: 100}]} source={asset(x)}/>
        </VrButton>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#639dda",
    borderWidth: 2
  },
  backpack: {
    width: 120,
    height: 150,
    opacity: 0.85
  },
  text: {
    padding:25,
    paddingLeft:40,
    paddingRight:40, 
    marginLeft:10, 
    marginRight:10,
    borderColor: "#639dda",
    borderWidth: 2
  },
  textSize: {
    fontSize: 50
  },
  itemButtons: {
    marginTop: 20, 
    paddingLeft: 150, 
    paddingRight: 150
  }
});

export default Inventory;
