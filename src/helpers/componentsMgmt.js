import changeRoom from "./roomMgmt";
import {
  dataStore,
  componentsMgmt,
  registerComponent,
  getPuzzleAnswers
} from "../../index";
import { asset, NativeModules } from "react-360";
const { AudioModule } = NativeModules;
import SimonFixed from "../../components/SimonFixed";

// State changes of all components of the game

const _componentsMgmt = (dataStore, ws) => {
  console.log("dataStore", dataStore);
  const componentsArray = [
    "hole",
    "rope",
    "basementPoster",
    "bedroomPoster",
    "bigPoster",
    "phone",
    "phoneNumpad",
    "inventory",
    "bedroomSafe",
    "safeKeypad",
    "bathroomDoor",
    "livingroomDoor",
    "backFromBathroom",
    "backFromLivingroom",
    "abstractArtFixed",
    "abstractArtDynamic",
    "bigAbstractArt",
    "mirrorCode",
    "simonFixed",
    "simonDynamic",
    "bomb",
    "ghost",
    "banana",
    // "babanana",
    "bunny",
    "crowbar",
    "chest",
    "Video360",
    "outro"
    // "blackHole"
  ];
  // abstractArtFixed
  const components = {};
  componentsArray.map(c => {
    console.log('c', c);
    components[c] = { name: c }
  });

  // Change gameId to be dynamic
  const sendCommand = (name, key, value) => {
    ws.send(
      JSON.stringify({
        commName: "shareState",
        commText: { gameId: "4242", prop: { name, key, value } }
      })
    );
  };

  dataStore.addListener("globalListener", async data => {
    const { name, action, content } = data;
    switch (name) {
      // BASEMENT COMPONENTS
      case "basementPoster":
        components.bigPoster.setState("show", true);
        components.bigPoster.setState(
          "message",
          components.bigPoster.state.fixedMessage + "\n\n" + content
        );
        components.inventory.setState("show", false);
        break;
      case "bomb":
        components.inventory.setState("show", false);
        break;
      case "bombTimer":
        // sendCommand('bomb', 'isRunning', true)
        // sendCommand('bomb', 'bombTime', content)
        components.bomb.state.startTimer(content);
        sendCommand("startTimer", content, true);
        // sendCommand('bomb', 'color', 'red');
        break;
      case "crowbar":
        sendCommand('crowbar', 'show', false);
        sendCommand('crowbar', 'isTaken', true);
        components.crowbar.setState("isTaken", true);
        components.inventory.setState("inventoryItems", {
          ...components.inventory.state.inventoryItems,
          crowbar: { q: 1, image: "crowbar.png", name: "crowbar" }
        });
        break;
      case "chest":
        sendCommand('chest', 'isOpen', true);
        setTimeout(() => {
          components.inventory.setState("inventoryItems", {
            ...components.inventory.state.inventoryItems,
            bathroomKey: { q: 1, image: "key.webp", name: "bathroomKey" }
          });
        }, 2000)
        break;
      // BEDROOM COMPONENTS
      case "banana":
        console.log('baaaaaaaaaaa', components.Video360.state)
        components.Video360.state.player.play({
          source: {url: asset('banana.mp4').uri},
          muted: false,
          autoPlay: true,
          })
        // components.Video360.state.player();
        break;
      case "bedroomPoster":
        components.bigPoster.setState("show", true);
        components.bigPoster.setState(
          "message",
          components.bigPoster.state.fixedMessage + "\n\n" + content
        );
        components.inventory.setState("show", false);
        break;
      case "bigPoster":
        components.inventory.setState("show", true);
        break;
      case "phone":
        components.phoneNumpad.setState("show", true);
        components.inventory.setState("show", false);
        break;
      case "phoneNumpad":
        components.inventory.setState("show", true);
        break;
      case "hole":
        sendCommand("rope", "show", true);
        sendCommand("hole", "canIGoThrough", true);
        break;
      case "bedroomSafe":
        components.safeKeypad.setState(
          "codeSolved",
          getPuzzleAnswers().phoneCode.join("")
        );
        components.safeKeypad.setState("component", "bedroomSafe");
        components.safeKeypad.setState("codeNumbers", []);
        components.safeKeypad.setState("show", true);
        components.inventory.setState("show", false);
        break;
      // Starts Safe Keypad
      case "safeKeypad":
        if (action === "bomb") {
          components[action].state.stopTimer();
          // components[action].setState('color', 'red');
          sendCommand("stopTimer", 'content', true);
          // sendCommand('bomb', 'color', 'red');
          // const msg = components.bomb.state.bombDisplay;
          setTimeout(() => {
            components.bomb.setState('color','red');
            // components.bomb.setState('bombDisplay', '');
            // components.bomb.setState('bombDisplay', msg);
          }, 800)
          setTimeout(() => changeRoom("freedom"), 5000);
          components.outro.setState("bombDisplay", components.bomb.state.bombDisplay)
          // components.outro.setState("bombDisplay", components.bomb.state.bombDisplay)
          sendCommand("outro", "bombDisplay", components.bomb.state.bombDisplay)
          break;
        }
        components[action].setState("index", content);
        sendCommand(action, "index", content);
        sendCommand(action, "available", false);
        components[action].setState("showItems", true);
        components[action].setState("available", false);
        // if (action === 'bedroomSafe') {
        // } else if (action === 'abstractArtFixed') {
        // } else
        break;
      case "safeKeypadTimeout":
        components[action].setState("showItems", false);
        if (action === "bedroomSafe") {
          components.inventory.setState("inventoryItems", {
            ...components.inventory.state.inventoryItems,
            rope: { q: 1, image: "bundle-rope.png", name: "rope" },
            // bathroomKey: { q: 1, image: "key.webp", name: "bathroomKey" }
          });
        } else if (action === "abstractArtFixed") {
          components.inventory.setState("inventoryItems", {
            ...components.inventory.state.inventoryItems,
            battery: { q: 1, image: "battery.png", name: "battery" },
            livingroomKey: {
              q: 1,
              image: "key_vertical.png",
              name: "livingroomKey"
            }
          });
        }
        break;
      // Ends Safe Keypad
      case "abstractArtDynamic":
        components.bigAbstractArt.setState("isDynamic", true);
        components.bigAbstractArt.setState("show", true);
        components.inventory.setState("show", false);
        components.bigAbstractArt.setState(
          "coords",
          getPuzzleAnswers().puzzleAbstractArt.coords
        );
        components.bigAbstractArt.setState(
          "coordsAnswer",
          getPuzzleAnswers().puzzleAbstractArt.coordsAnswers
        );
        components.bigAbstractArt.setState(
          "transformation",
          getPuzzleAnswers().puzzleAbstractArt.randomTransformation
        );
        break;
      case "bigAbstractArt":
        components.inventory.setState("show", true);
        break;
      // BATHROOM COMPONENTS
      case "abstractArtFixed":
        if (!content.isSolved) {
          components.bigAbstractArt.setState("isDynamic", false);
          components.bigAbstractArt.setState("show", true);
          components.inventory.setState("show", false);
          components.bigAbstractArt.setState(
            "coords",
            getPuzzleAnswers().puzzleAbstractArt.coords
          );
          components.bigAbstractArt.setState(
            "coordsAnswer",
            getPuzzleAnswers().puzzleAbstractArt.coordsAnswers
          );
          components.bigAbstractArt.setState(
            "transformation",
            getPuzzleAnswers().puzzleAbstractArt.randomTransformation
          );
        } else {
          components.safeKeypad.setState(
            "codeSolved",
            getPuzzleAnswers().mirrorCode.join("")
          );
          components.safeKeypad.setState("component", "abstractArtFixed");
          components.safeKeypad.setState("codeNumbers", []);
          components.safeKeypad.setState("show", true);
          components.inventory.setState("show", false);
        }
        break;
      case "abstractArtSolved":
        components.abstractArtFixed.setState("solved", true);
        components.bigAbstractArt.setState("show", false);
        sendCommand("abstractArtFixed", "solved", true);
        sendCommand("bigAbstractArt", "show", false);
        break;
      case "openNextDoorRoom":
        // components.abstractArtFixed.setState('solved', true);
        sendCommand(content, "canIGoThrough", true);
        break;
      // GENERAL COMPONENTS
      case "onItemUsed":
        console.log("content>");
        console.log("content", content);
        let inventoryItems = { ...components.inventory.state.inventoryItems };
        console.log("inventoryItems", inventoryItems);
        inventoryItems[content.item].q -= content.num;
        components.inventory.setState(inventoryItems, inventoryItems);
        break;
      case "puzzleAnswersReceived":
        components.mirrorCode.setState("mirrorCode", content.mirrorCode);
        break;
      case "simonAnswers":
        components.simonDynamic.setState("simonCode", content.simonCode);
        sendCommand("simonDynamic", "simonCode", content.simonCode);
        components.ghost.setState("bombCode", content.bombCode);
        sendCommand("ghost", "bombCode", content.bombCode);
        break;
      case "simonSolved":
        sendCommand("simonDynamic", "solved", content);
        sendCommand("ghost", "show", content);
        sendCommand("ghost", "isSolved", content);
        components.ghost.setState("show", content);
        components.ghost.setState("isSolved", content);
        break;
      // Bomb
      case "safeKeyPadBomb":
        components.safeKeypad.setState(
          "codeSolved",
          getPuzzleAnswers().bombCode.join("")
        );
        components.safeKeypad.setState("component", "bomb");
        components.safeKeypad.setState("codeNumbers", []);
        components.safeKeypad.setState("show", true);
        components.chest.setState("show", false);
        components.inventory.setState("show", false);
        break;
      case "bombIsPowered":
        sendCommand("bomb", "isPowered", true);
        break;
      case "bunny":
        components.bunny.setState("show", true)
        break;
      case "bombTimeout":
          setTimeout(() => changeRoom("dead"), 5000);
        break;
      case "changeEnvironment":
        changeRoom(content);
        if (content !== "basement" && content !== "freedom") {
          // AudioModule.playOneShot({ source: asset("door_2.wav"), volume: 1 });
          if (content === "livingroom") {
            components.simonFixed.state.startFunction();
          }
        }
        break;
      case "all":
        if (content.name === "startTimer") {
          components.bomb.state.startTimer(content.key);
        } else if (content.name === "stopTimer") {
          console.log('Stop TIMEEEEEEER>>>>>>>>>>>>>>');
          components.bomb.state.stopTimer();
          // const msg = components.bomb.state.bombDisplay;
          setTimeout(() => {
            components.bomb.setState('color','red');
            // components.bomb.setState('bombDisplay', '');
            // components.bomb.setState('bombDisplay', msg);
          }, 800)
          setTimeout(() => changeRoom("freedom"), 5000);
        } else {
          components[content.name].setState(content.key, content.value);
        }
        break;
    }
  });
  return components;
};

module.exports = { _componentsMgmt };
