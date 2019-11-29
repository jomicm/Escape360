import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  NativeModules,
  Environment,
  VrButton,
} from 'react-360';
// import {UIManager, findNodeHandle} from 'react-native';
import {default as VideoModule, VideoPlayerInstance, 
  type VideoStatusEvent} from 'VideoModule';
// import MediaAppTemplateInfoButton from "MediaAppTemplateInfoButton.react";
import MediaAppTemplateVideoScreen from './VideoScreen';

// const {AudioModule} = NativeModules;

type Players = {
  scene: VideoPlayerInstance,
  screen: VideoPlayerInstance,
};

const TRANSITION_TIME = 2000;

class Video360 extends React.Component {
  _players: Players;
  _nextPlayers: Players;
  _preloadJob: ?Promise<void>;
  _preloading: boolean = false;
  state = {
    inTransition: false,
  };

  componentWillMount() {
    this._players = { 
      scene: VideoModule.createPlayer(), 
      screen: VideoModule.createPlayer(),
    };
    this._nextPlayers = { 
      scene: VideoModule.createPlayer(), 
      screen: VideoModule.createPlayer(),
    };
    this._renderScene(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._renderScene(nextProps);
  }

  _preloadVideo(player, source) {
    // Video can be preloaded by calling `play()`
    // on a video player that is not attached to the environment or a screen
    // with `muted=true` and `autoPlay=false`.
    // Here we are swaping two sets of video players, one set for displaying
    // another set for preloading.
    // You can listen to the 'onVideoStatusChanged' event to check when
    // the loading is done.
    return new Promise((resolve, reject) => {
      const onVideoLoadedSubscription =
        player.addListener('onVideoStatusChanged', (event: VideoStatusEvent) => {
          if (event.status === 'ready') {
            player.removeSubscription(onVideoLoadedSubscription);
            resolve();
          }
        });
        console.log('FROM PROMISE VIDEO PLAYER>>>>', this.props.src)
        player.play({
          // source: source,
          source: {url: asset('banana.mp4').uri},
          // source:  this.props.src,
          muted: false,
          autoPlay: false,
        });
    });
  }

  _preloadScene(data) {
    const promises = [];
      // Preload the background 360 photo
      // Calling setBackgroundImage while the photo is still preloading is fine,
      // it will keep on loading and display the background image when it's done.
      Environment.preloadBackgroundImage(asset('360_world.jpg'), {format: '2D'});
      promises.push(Promise.resolve());

    if (data.screen) {
      // Preload the rectilinear video on the screen.
      promises.push(this._preloadVideo(this._nextPlayers.screen, data.screen));
    }

    return Promise.all(promises);
  }

  // {
  //   type: 'photo',
  //   title: '2D Street View',
  //   source: asset('360_world.jpg'),
  //   screen: {url: asset('video.mp4').uri},
  //   next: 0,
  //   subtitle: 'This is a 2d video of street view, you can see the traffic.',
  // },

  _renderScene(nextProps) {
    const data = nextProps.currentScene;
    this._preloading = true;
    const loadScene = () => {
      this._preloading = false;
      // video player clean up work
      this._players.scene.stop();
      this._players.screen.stop();
      // swap the players for next preload
      const temp = this._players;
      this._players = this._nextPlayers;
      this._nextPlayers = temp;

      // Environment.setBackgroundImage(asset('360_world.jpg'), {format: '2D', transition: TRANSITION_TIME});
      this.setState({inTransition: true});
      setTimeout(() => { this.setState({inTransition: false}); }, TRANSITION_TIME);

      this._players.screen.resume();


      // preload next scene
      const nextData = nextProps.nextScene;
      this._preloadJob = this._preloadScene(nextData);
    };

    if (this._preloadJob != null) {
      this._preloadJob.then(loadScene);
    } else {
      this._preloadScene(data).then(loadScene);
    }
  }

  render() {
    // const showScreen = !!(!this._preloading
    //   && !this.state.inTransition
    //   && this.props.currentScene.screen);
  
    {/* <View style={[styles.container, this.state.inTransition && {opacity: 0}]}> */}
    return (
      <View style={[styles.container]}>
        <MediaAppTemplateVideoScreen
          src={this.props.src}
          player={this._players.screen._player}
          style={styles.screen}
          visible={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
  },
  screen: {
    width: 580,
    height: 320,
  }
});

module.exports = Video360;