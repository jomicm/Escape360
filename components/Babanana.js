// import React, { useState, Component, Fragment } from 'react';
// import { asset, StyleSheet, Image, Text, VrButton, Video, View, Environment, staticResourceURL } from 'react-360';
// import { dataStore, getPuzzleAnswers, componentsMgmt } from '../index';
// import VideoModule from 'VideoModule';
// // import as * Environment from 'Environment';
// // import Video360 from './Video360';


// // The mock database
// const SCENE_DEF = [
//   {
//     type: 'photo',
//     title: 'Welcome Scene',
//     source: asset('chess-world.jpg'),
//     audio: asset('cafe.wav'),
//     next: 1,
//     subtitle: 'This is the welcome scene, just look around!',
//   },
//   {
//     type: 'video',
//     title: '360 Street View',
//     source: {url: asset('video360.mp4').uri},
//     next: 2,
//     subtitle: 'This is a 360 street view, you can see the traffic.',
//   },
//   {
//     type: 'photo',
//     title: '2D Street View',
//     source: asset('360_world.jpg'),
//     screen: {url: asset('video.mp4').uri},
//     next: 0,
//     subtitle: 'This is a 2d video of street view, you can see the traffic.',
//   },
// ];


// const VIDEO_PLAYER = 'dash_video';
// const VIDEO_SOURCE =[
//   {
//     url: asset('video.mp4').uri, 
//     fileFormat: 'mp4',
//   },
// ];



// class Babanana extends Component {
//   state = {
//     show: true,
//     index: 2,
//   }

//   _onPosterClick = (show) => {
//     const phoneNumBasement = getPuzzleAnswers().phoneNumBasement;
//     dataStore.emit('globalListener', {name: 'basementPoster', action:'click', content: phoneNumBasement});
//     console.log('AUDIOOOOO WINDOW>', window.AudioContext);
//     console.log('STREAAAAAAAM?>>>>>>', this.props.src)
//   }

//   componentWillMount() {
 
//     console.log('Mounting from poster.js!');
//     dataStore.addListener('ropeClick', this._onRopeClick);
//     dataStore.addListener('holeClick', this._onHoleClick);
//   }
//   componentDidMount() {
//     componentsMgmt.basementPoster.state = this.state;
//     componentsMgmt.basementPoster.setState = async(key, val) => { 
//       await this.setState({[key]: val});
//       componentsMgmt.basementPoster.state = this.state;
//     }

//     const player = VideoModule.createPlayer('myplayer');

//     player.play({
//       source: {url: staticResourceURL('./static_assets/me.mov')}
//     });

//     Environment.setScreen('default', VIDEO_PLAYER, 'default', 0, 0, 1000, 600);
//   }
//   render() {
//   console.log('FROM POSTER >', this.props.src);

//   const currentScene = SCENE_DEF[this.state.index];
//   const nextScene = SCENE_DEF[SCENE_DEF[this.state.index].next];
//   return (
//     <VrButton onClick={() => this._onPosterClick(true)}>
//       <Image style={{width:130, height:180, left:0, top:0}} source={asset('poster.png')}/>
//         <Text style={styles.text}>{`Hello!`}</Text>
//         {/* <Video360
//           src={this.props.src}
//           currentScene={currentScene}
//           nextScene={nextScene}
//           onClickNext={this._onClickNext} /> */}
//           <VideoPlayer
//           muted={true}
//           source={{url: asset('video.mp4')}}
//           stereo={'2D'}
//           style={{
//             width: 600,
//             height: 400,
//           }}
//         />
//     </VrButton>
//   )}
// }
// {/* <Video style={{width: 100, height:100}} source={{url:asset('video.mp4')}} /> */}

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 15,
//     color: 'black',
//     textAlign: 'center',
//     top: -130,
//   },
// });

// export default Babanana;