"use strict";

import React, { Component } from "react";
import { asset, StyleSheet, Text, View, Image, VrButton} from "react-360";
import dataStore from '../index';

class Inventory extends Component {
  state = {
    inventoryShow: false, 
    inventoryItems: {
      'bunny': {q: 1, image: 'bunny.png', name:'bunny'},
    }
  };

  componentWillMount() {
    console.log('Mounting! inventory.js');
    dataStore.addListener('bedroomGetSafeItemsToInventory', this._onBedroomGetSafeItemsToInventory);
  }

  handleClick = () => {
    console.log('backpack clicked')
    this.setState({inventoryShow: this.state.inventoryShow === true ? false : true});
  };
  _onInventoryButton = (item) => {
    console.log('inventory item clicked')
  }
  _onBedroomGetSafeItemsToInventory = () => {
    this.setState({inventoryItems: {...this.state.inventoryItems, 'rope': {q: 1, image: 'bundle-rope.png', name: 'rope'}, 'bathroom-key': {q: 1, image:'key.webp', name: 'bathroom-key'}}})
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
        <VrButton key={'item' + ix} onClick={() => this._onInventoryButton(Object.keys(x.name))}>
          <Image style={[styles.backpack, styles.text, {top: -(this.props.height / 3.3), height: 100, width: 100}]} source={asset(x.image)}/>
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
    marginLeft:15, 
    marginRight:15,
    borderColor: "grey",
    borderWidth: 2,
    backgroundColor: 'black',
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
