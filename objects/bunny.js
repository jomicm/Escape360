import React, { Component, Fragment } from 'react';
// import Zone from '../constants/zoneconstants';
// import {isZone} from '../helpers/zonehelpers';
// import {connect} from '../store/store';
import { componentsMgmt } from '../index';
import {View, AmbientLight, asset, VrButton, Image} from 'react-360';
import Entity from 'Entity';

class Bunny extends Component {
  state = {
    show: false,
    // showHeart: true
  }

  componentDidMount() {
    componentsMgmt.bunny.state = this.state;
    componentsMgmt.bunny.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.bunny.state = this.state;
    }
  }

  _onBunnyClick = () => {
    // this.setState({showHeart: true})
    // setTimeout(() => {
    //   this.setState({showHeart: false})
    // }, 2000)
    this.setState({show: false})
    console.log('hop hop')
  }

  render(){
  return (
    // (isZone(props.zone, Zone.Ookei) || isZone(props.zone, Zone.Buzko)) && 
    <View>
      {/* {this.state.showHeart && <Entity style={{width:250, height:250, left:0, top:0}} source={asset('bubblelove.png')} />} */}
    {this.state.show && <View>
      <AmbientLight intensity={ 0.4 } />
      <VrButton onClick={() => this._onBunnyClick()}>
        <Entity
          source={{
            obj: asset('Bunny.obj'),
            mtl: asset('Bunny.mtl')
          }}
          // lit={true}
          style={{
            transform: [
              {translate: [2, -1, -2.6]},
              {rotateY: 30},
              {rotateX: -100},
              {scale: 0.003}
            ]
          }}
        />
      </VrButton>
    </View>}
    </View>
  )};
};

export default Bunny;