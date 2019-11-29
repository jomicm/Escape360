import React, { Component } from "react";
import { asset, StyleSheet, Text, View, Image, VrButton, NativeModules } from "react-360";
import { dataStore, componentsMgmt } from "../../index";
import Back from '../Back'
const { AudioModule } = NativeModules;

class BigPoster extends Component {
  state = {
    coords: [],
    coordsAnswer: [],
    solveCoords: Array(25).fill(-1),
    show: false,
    isDynamic: false,
    selectedColor: 0,
    opacity: [0.3, 0.3, 0.3, 0.3],
    paletteOpacity: [0.9, 0.3, 0.3, 0.3],
    colors: [
      "rgba(255,255,255,",
      "rgba(255,0,0,",
      "rgba(0,255,0,",
      "rgba(0,0,255,"
    ],
    images: ['art_0.jpg', 'art_1.jpg', 'art_2.jpg', 'art_3.jpg', 'art_4.jpg'],
    transformation: 0,
    zIx: 10,
    reset: false,
    selectedColors: Array(25).fill('rgba(255,255,255,0.5)')
  };

  _setState = (key, val) => {
    this.setState({[key]: val});
  }
  handlePaletteClick = c => {
    this.setState({ selectedColor: c });
    const paletteOpacity = [0.3, 0.3, 0.3, 0.3];
    paletteOpacity[c] = 0.9;
    this.setState({ paletteOpacity });
  };
  resetBoard = () => {
    this.setState({solveCoords: Array(25).fill(-1)});
    this.setState({selectedColors: Array(25).fill('rgba(255,255,255,0.5)')});
  };
  setCoords = async(ix, val) => {
    const solveCoords = [...this.state.solveCoords];
    solveCoords[ix] = val - 1;
    await this.setState({solveCoords})
    if (this.state.solveCoords.join('') === this.state.coordsAnswer.join('')) {
      dataStore.emit('globalListener', {name: 'abstractArtSolved', action:'solved'});
      AudioModule.playOneShot({ source: asset("safe_opens.wav"), volume: 1 });
    }
    
  };
  componentDidMount() {
    componentsMgmt.bigAbstractArt.state = this.state;
    componentsMgmt.bigAbstractArt.setState = async (key, val) => {
      await this.setState({ [key]: val });
      componentsMgmt.bigAbstractArt.state = this.state;
    };
  }
  render() {
    let artSelected = this.state.images[this.state.transformation];
    artSelected = !this.state.isDynamic ? this.state.images[4] : artSelected;
    return (
      <View>
        {this.state.show && (
          <View style={[styles.container,{ width: this.props.width, height: this.props.height}, {backgroundColor: 'rgba(1, 0, 0, 0.9)'}]}>
            <Back onClick={() => {this.setState({show: false}); dataStore.emit('globalListener', {name: 'bigAbstractArt', action:'click'});}}/>
            {this.state.isDynamic && (
              <View>
                <ColorPalette style={{margin: 200, padding:15}} colors={this.state.colors} opacity={this.state.paletteOpacity} onPaletteClick={this.handlePaletteClick}/>
              </View>
            )}

            <VrButton onClick={this.handleClick}>
              <Image style={[styles.poster]} source={asset(artSelected)}/>
              <Board
                isDynamic={this.state.isDynamic}
                width={5}
                height={5}
                coords={this.state.coords}
                setCoords={this.setCoords}
                resetBoard={this.resetBoard}
                selectedColor={this.state.selectedColor}
                selectedColors={this.state.selectedColors}
                colors={this.state.colors}
                opacity={this.state.opacity}
                reset={this.state.reset}
                _setState={this._setState}
              />
            </VrButton>
            {this.state.isDynamic && (
              <VrButton style={{marginBottom:20, top:-330}} onClick={() => this.resetBoard()}>
                <Image style={{width:50, height:50}} source={asset('reset.png')}/>
              </VrButton>
            )}
          </View>
        )}
      </View>
    );
  }
}

class ColorPalette extends Component {
  render() {
    const backColor = [];
    this.props.colors.map((c, ix) => backColor.push(`${c}${this.props.opacity[ix]})`));
    return (
      <View style={styles.row}>
        {backColor.map((c, ix) => (
          <VrButton key={"palette" + c} onClick={() => this.props.onPaletteClick(ix)}>
            <View style={{ width: 50, height: 50, backgroundColor: c, marginHorizontal:10, marginBottom: 20, borderRadius: 10 }}></View>
          </VrButton>
        ))}
      </View>
    );
  }
}

class Tile extends Component {
  render() {
    const colors = this.props.colors.map((c, ix) => `${c}${this.props.opacity[ix]})`);
    const index = this.props.len * this.props.start + this.props.id;
    const symbol = ["", "X", "O", "+"];
    if (!this.props.isDynamic) {
      return (
        <View style={[styles.tile, { backgroundColor: colors[this.props.coords[index] + 1] }]}>
          <Text style={{ color: "black", fontWeight: "bold" }}>{}</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.tile, { backgroundColor: this.props.selectedColors[index] }]}>
          <Text style={{ color: "black", fontWeight: "bold" }}>{}</Text>
        </View>
      );
    }
  }
}

class Row extends Component {
  _onTileClick = async ix => {
    const index = this.props.len * this.props.start + ix;
    let selectedColors = [...this.props.selectedColors];
    selectedColors[index] = this.props.colors[this.props.selectedColor] + "0.5)";
    this.props._setState('selectedColors', selectedColors);
    this.props.setCoords(index, this.props.selectedColor);
  };
  _onResetClick = () => {
    this.setState({selectedColor: Array(25).fill(this.props.colors[0] + "0.5)")});
    this.props.resetBoard();
  };
  render() {
    const _len = Array(this.props.width).fill(0);
    return (
      <View style={styles.row}>
        {_len.map((t, ix) => (
          <VrButton key={"tile" + ix} onClick={() => this._onTileClick(ix)}>
            <Tile
              isDynamic={this.props.isDynamic}
              coords={this.props.coords}
              start={this.props.start}
              len={this.props.len}
              id={ix}
              selectedColors={this.props.selectedColors}
              colors={this.props.colors}
              opacity={this.props.opacity}
            />
          </VrButton>
        ))}
      </View>
    );
  }
}

class Board extends Component {
  render() {
    const _len = Array(this.props.height).fill(0);
    return (
      <View style={styles.board}>
        {_len.map((r, ix) => (
          <Row
            isDynamic={this.props.isDynamic}
            coords={this.props.coords}
            setCoords={this.props.setCoords}
            resetBoard={this.props.resetBoard}
            len={this.props.width}
            start={ix}
            key={"row" + ix}
            width={this.props.width}
            selectedColor={this.props.selectedColor}
            selectedColors={this.props.selectedColors}
            colors={this.props.colors}
            opacity={this.props.opacity}
            reset={this.props.reset}
            _setState={this.props._setState}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 180,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#639dda",
    borderWidth: 2
  },
  poster: {
    left: 0,
    width: 350, 
    height: 350
    // top: 50
  },
  text: {
    fontSize: 50,
    color: "black",
    textAlign: "center",
    top: -400
  },
  board: {
    top: -350,
    left: 0
  },
  row: {
    flexDirection: "row"
  },
  tile: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 150,
    height: 50,
    borderRadius: 10
  }
});

export default BigPoster;
