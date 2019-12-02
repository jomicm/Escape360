import React, { Component } from 'react';
// import Zone from '../constants/zoneconstants';
// import {isZone} from '../helpers/zonehelpers';
// import {connect} from '../store/store';
import { View, asset, VrButton, AmbientLight } from 'react-360';
import Entity from 'Entity';
import { componentsMgmt, dataStore } from '../index';

export default class Chest extends Component {

  state = {
    show: false,
    isOpen: false,
    key: false,
  }

  componentDidMount = () => {
    componentsMgmt.chest.state = this.state;
    componentsMgmt.chest.setState = async (key, val) => {
      await this.setState({[key]: val});
      componentsMgmt.chest.state = this.setState;
    }

  }

  handleClick = () => {
    if(!this.state.isOpen) {
      if (componentsMgmt.inventory.state.selectedItem === 'crowbar') {
        this.setState({isOpen: true});
        dataStore.emit('globalListener', { name: 'chest', action: 'click'});
        dataStore.emit('globalListener', {name: 'onItemUsed', action: 'click', content: {item: 'crowbar', num: 1}});
        setTimeout(()=> {
          this.setState({key: true})
        }, 400);
        setTimeout(()=> {
          this.setState({key: false})
        }, 2200);
      } else {
        {this.state.show && <Text>It's stuck</Text>}
      }
    }
  }

  render = () => {
    return (
      // (isZone(props.zone, Zone.Ookei) || isZone(props.zone, Zone.Buzko)) && 
      <View>
        <VrButton onClick={this.handleClick}>
          {this.state.show && <Entity
            source={{
              obj: asset(`/chest/chest${this.state.isOpen? '-open' : ''}.obj`),
              mtl: asset('/chest/chest.mtl')
            }}
            // lit={true}
            style={{
              transform: [
                {translate: [-0.3, 0, 0.28]},
                {rotateY: -3},
                {scale: 0.15}
              ]
            }}
          />}
          {/* <AmbientLight intensity={ 0.4 } /> */}
          {this.state.key && <Entity
            source={{
              obj: asset('/Key_B.obj/Key_B_02.obj'),
              mtl: asset('/Key_B.obj/Key_B_02.mtl')
            }}
            style={{
              transform: [
                {translate: [-0.27, 0.3, 0.2]},
                {rotateY: -3},
                {scale: 0.023}
              ]
            }}
          />}

        </VrButton>
      </View>
    );

  }
};