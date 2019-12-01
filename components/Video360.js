import React from 'react';
import { StyleSheet, Text, View, asset, Environment, VrButton} from 'react-360';
import {default as VideoModule, VideoPlayerInstance, type VideoStatusEvent} from 'VideoModule';
import MediaAppTemplateVideoScreen from 'MediaAppTemplateVideoScreen.react';
import { dataStore, componentsMgmt } from '../index';


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
    sound: false,
    player: null,
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

  componentDidMount() {
    componentsMgmt.Video360.state = this.state;
    componentsMgmt.Video360.setState = async(key, val) => { 
      await this.setState({[key]: val});
      componentsMgmt.Video360.state = this.state;
    }
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
    // let player;
    return new Promise((resolve, reject) => {
      const onVideoLoadedSubscription =
        player.addListener('onVideoStatusChanged', (event: VideoStatusEvent) => {
          if (event.status === 'ready') {
            player.removeSubscription(onVideoLoadedSubscription);
            resolve();
          }
        });
        this.setState({player});
      // player.play({
      //   source: source,
      //   muted: false,
      //   autoPlay: false,
      // });
    });
  }

  _preloadScene(data) {
    const promises = [];
      Environment.preloadBackgroundImage(asset('360_world.jpg'), {format: '2D'});
      promises.push(Promise.resolve());
    if (data.screen) {
      promises.push(this._preloadVideo(this._nextPlayers.screen, data.screen));
    }
    return Promise.all(promises);
  }

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
    const showScreen = !!(!this._preloading
      && !this.state.inTransition
      && this.props.currentScene.screen);
    return (
      <View style={[styles.container]}>
        <MediaAppTemplateVideoScreen
          player={this._players.screen._player}
          style={styles.screen}
          visible={showScreen}
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
    width: 500,
    height: 250,
    transform: [
      {rotateY: '100deg'}
    ]
  }
});

module.exports = Video360;
