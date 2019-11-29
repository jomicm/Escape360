"use strict";

import React, { Component } from "react";
import { asset, StyleSheet, Text, View, Image, VrButton} from "react-360";
// import dataStore from '../index';
import { dataStore, inventoryViewer, componentsMgmt } from '../index';

class Inventory extends Component {
  state = {
    show: true,
    selectedItem: '',
    inventoryShow: false, 
    inventoryItems: {
      'bunny': {q: 1, image: 'bunny.png', name:'bunny'},
    }
  };

  componentDidMount() {
    componentsMgmt.inventory.state = this.state;
    componentsMgmt.inventory.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.inventory.state = this.state;
    }
  }

  handleClick = () => {
    console.log('backpack clicked')
    this.setState({inventoryShow: this.state.inventoryShow === true ? false : true});
  };
  _onInventoryButton = async(item) => {
    // inventoryViewer.selectedItem = item;
    await this.setState({selectedItem: item});
    if(item === 'bunny') {
      dataStore.emit('globalListener', {name: 'bunny', action:'click'});
    }
    componentsMgmt.inventory.state = this.state;
  }
  // _onBedroomGetSafeItemsToInventory = () => {
  //   this.setState({inventoryItems: {...this.state.inventoryItems, 'rope': {q: 1, image: 'bundle-rope.png', name: 'rope'}, 'bathroomKey': {q: 1, image:'key.webp', name: 'bathroomKey'}}})
  // }
  // _onItemUsed = (item, num) => {
  //   console.log(`this was used ${item} ${num}`);
  //   let inventoryItems = {...this.state.inventoryItems}
  //   inventoryItems[item].q -= num
  //   this.setState({inventoryItems})
  // }
  render() {
    const backGround = Object.keys(this.state.inventoryItems).map(key => key === this.state.selectedItem ? 'white' : 'black');
    if (!this.state.show) {
      return <View />
    } else {
      return (
        <View style={[styles.container,{ width: this.props.width, height: this.props.height }]}>
          <VrButton onClick={this.handleClick}>
            <Image
              style={[styles.backpack, {top: -(this.props.height / 3.3)}]}
              source={asset("backpack.png")}
            />
          </VrButton>
          {this.state.inventoryShow && 
          Object.values(this.state.inventoryItems).map((x, ix) => (
            <VrButton key={'item' + ix} onClick={() => this._onInventoryButton(x.name)}>
              { !x.q ? <View/> : <Image style={[styles.backpack, styles.text, {top: -(this.props.height / 3.3), backgroundColor: backGround[ix]}]} source={asset(x.image)}/>}
            </VrButton>
          ))}
        </View>
      );
    }
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
    height: 100, 
    width: 100,
    padding:25,
    paddingLeft:40,
    paddingRight:40, 
    marginLeft:15, 
    marginRight:15,
    borderColor: "grey",
    borderWidth: 2,
    // backgroundColor: 'black',
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
