import React, { Component } from 'react';
import { asset, StyleSheet, Image, Text, VrButton } from 'react-360';

class Robot extends Component {
  state = {
    image: 'robot.png'
  }
  render() {
    return (
      <VrButton onClick={() => this.setState({image: this.state.image === 'bunny.png' ? 'robot.png' : 'bunny.png'}) }>
        <Image style={{width:130, height:180, left:0, top:0}} source={asset(this.state.image)}/>
      </VrButton>
    );
  }
}

export default Robot;
{/* <Image style={{width:130, height:180, left:0, top:0}} source={asset(this.state.image)}/> */}
{/* <VrButton onClick={() => console.log('Robot kill bunnies!')} onMouseOver={() => console.log('Robot kill bunnies Enter!')}> */}