import React, { Component, Fragment } from "react";
import { asset, StyleSheet, Image, Text, VrButton, View, NativeModules } from "react-360";
import Back from "./Back";
import { dataStore, getPuzzleAnswers, componentsMgmt } from "../index";
const { AudioModule } = NativeModules;

export default class SafeKeypad extends Component {
  state = {
    code: Array(4).fill("-"),
    codeNumbers: [],
    len: 4,
    show: false,
    codeSolved: '',
    component: '',
  };
  setCode = c => {
    let codeNumbers = [...this.state.codeNumbers];
    if (codeNumbers[codeNumbers.length - 1] === c) return;
    codeNumbers.push(c);
    if (codeNumbers.length === this.state.len) {
      console.log("codeNumbers.join()", codeNumbers.join(""));
      // if (codeNumbers.join("") === getPuzzleAnswers().phoneCode.join("")) {
      if (codeNumbers.join("") === this.state.codeSolved) {
        console.log("the code is correct");
        // dataStore.emit('globalListener', {name: 'safeKeypad', action:'correctBedroomSafeCode', content:1});
        dataStore.emit('globalListener', {name: 'safeKeypad', action: this.state.component, content:1});
        AudioModule.playOneShot({ source: asset("safe_opens.wav"), volume: 1 });
        setTimeout(() => {
          this.onBackClick();
          setTimeout(() => {
            dataStore.emit('globalListener', {name: 'safeKeypadTimeout', action: this.state.component});
            // dataStore.emit("bedroomGetSafeItems", true);
            // dataStore.emit("bedroomGetSafeItemsToInventory", true);
          }, 2000);
        }, 900);
      } else {
        codeNumbers = [];
      }
    }
    this.setState({ codeNumbers });
  };
  // _onBedroomSafeClick = show => {
  //   console.log("this is numbers");
  //   this.setState({ show: true });
  // };
  // componentWillMount() {
  //   // dataStore.addListener("bedroomSafeClick", this._onBedroomSafeClick);
  // }
  componentDidMount() {
    componentsMgmt.safeKeypad.state = this.state;
    componentsMgmt.safeKeypad.setState = async (key, val) => {
      await this.setState({ [key]: val });
      componentsMgmt.safeKeypad.state = this.state;
    };
  }
  onBackClick = () => {
    this.setState({ show: false });
    dataStore.emit("globalListener", { name: "phoneNumpad", action: "click" });
  };
  render() {
    if (this.state.show) {
      return (
        <View style={[styles.container, styles.text,{ width: this.props.width, height: this.props.height }]}>
          <Text style={styles.textSize}>
            {this.state.code.map((n, ix) =>
                this.state.codeNumbers[ix] !== undefined ? this.state.codeNumbers[ix] + " " : n + " ").join("")}
          </Text>
          {[1, 4, 7].map((x, ix) => (
            <NumRow
              key={"num" + ix}
              initial={x}
              setCode={this.setCode}
              cols={3}
            />
          ))}
          <Back onClick={this.onBackClick} />
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

const NumRow = props => {
  const nums = Array(props.cols).fill(0);
  const handleClick = ix => {
    props.setCode(ix + props.initial);
    AudioModule.playOneShot({ source: asset("menu-click.wav"), volume: 1 });
  };
  return (
    <View style={{ display: "flex", flexDirection: "row", padding: 5 }}>
      {nums.map((n, ix) => (
        <VrButton key={ix} style={styles.text} onClick={() => handleClick(ix)}>
          <Text style={styles.textSize}>{ix + props.initial}</Text>
        </VrButton>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#639dda",
    borderWidth: 2,
    backgroundColor: "black"
  },
  text: {
    padding: 25,
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: 40,
    marginRight: 40,
    borderColor: "#639dda",
    borderWidth: 2
  },
  textSize: {
    fontSize: 50
  },
  actionButtons: {
    marginTop: 20,
    paddingLeft: 150,
    paddingRight: 150
  }
});
