import React, { Component, Fragment } from 'react';
// import Zone from '../constants/zoneconstants';
// import {isZone} from '../helpers/zonehelpers';
// import {connect} from '../store/store';
import { dataStore, componentsMgmt } from '../index';
import {View, AmbientLight, asset, VrButton} from 'react-360';
import Entity from 'Entity';

class Banana extends Component {
  state = {
    show: false,
  }

  componentDidMount() {
    componentsMgmt.banana.state = this.state;
    componentsMgmt.banana.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.banana.state = this.state;
    }
  }

  _onBananaClick = () => {
    console.log('bababababanananaaaaaa')
    dataStore.emit('globalListener', {name: 'banana', action:'click'});
  }

  render(){
  return (
    // (isZone(props.zone, Zone.Ookei) || isZone(props.zone, Zone.Buzko)) && 
    <View>
      {this.state.show && <View>
        <AmbientLight intensity={ 0.4 } />
        <VrButton onClick={() => this._onBananaClick()}>
          <Entity
            source={{
              obj: asset('Banana.obj'),
              mtl: asset('Banana.mtl')
            }}
            // lit={true}
            style={{
              transform: [
                {translate: [2, -1, -2.6]},
                {rotateY: 30},
                {rotateX: -100},
                {scale: 2}
              ]
            }}
          />
        </VrButton>
      </View>}
    </View>
  )};
};

export default Banana;
// const ConnectedBanana = connect(Banana);

// export default ConnectedBanana;
