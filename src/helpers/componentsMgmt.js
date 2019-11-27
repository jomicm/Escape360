import changeRoom from './roomMgmt';
import { dataStore, componentsMgmt, registerComponent, getPuzzleAnswers } from '../../index';
import { asset, NativeModules } from 'react-360'
const { AudioModule } = NativeModules;

// State changes of all components of the game

const _componentsMgmt = (dataStore, ws) => {
  console.log('dataStore', dataStore);
  const componentsArray = ['hole', 'rope', 'basementPoster', 'bedroomPoster', 'bigPoster', 'phone', 'phoneNumpad', 'inventory', 'bedroomSafe', 'safeKeypad', 'bathroomDoor', 'livingroomDoor', 'goBackDoor', 'abstractArtFixed', 'abstractArtDynamic', 'bigAbstractArt', 'mirrorCode'];
  // abstractArtFixed
  const components = {};
  componentsArray.map(c => components[c] = {name: c});


  // Change gameId to be dynamic
  const sendCommand = (name, key, value) => {
    ws.send(JSON.stringify({commName:"shareState", commText:{gameId:'4242', prop: {name, key, value}}}));
  };

  dataStore.addListener('globalListener', async(data) => {
    const { name, action, content } = data;
    switch (name) {
    // BASEMENT COMPONENTS
    case 'basementPoster':
      components.bigPoster.setState('show', true);
      components.bigPoster.setState('message', components.bigPoster.state.fixedMessage + '\n\n' + content);
      components.inventory.setState('show', false);
      break;
    // BEDROOM COMPONENTS
    case 'bedroomPoster':
      components.bigPoster.setState('show', true);
      components.bigPoster.setState('message', components.bigPoster.state.fixedMessage + '\n\n' + content);
      components.inventory.setState('show', false);
      break;
    case 'bigPoster':
      components.inventory.setState('show', true);
      break;
    case 'phone':
      components.phoneNumpad.setState('show', true);
      components.inventory.setState('show', false);
      break;
    case 'phoneNumpad':
      components.inventory.setState('show', true);
      break;
    case 'hole':
      sendCommand('rope', 'show', true);
      sendCommand('hole', 'canIGoThrough', true);
      break;
    case 'bedroomSafe':
      components.safeKeypad.setState('codeSolved', getPuzzleAnswers().phoneCode.join(""));
      components.safeKeypad.setState('component', 'bedroomSafe');
      components.safeKeypad.setState('codeNumbers', []);
      components.safeKeypad.setState('show', true);
      components.inventory.setState('show', false);
      break;
    // Starts Safe Keypad
    case 'safeKeypad':
      components[action].setState('index', content);
      sendCommand(action, 'index', content);
      sendCommand(action, 'available', false);
      components[action].setState('showItems', true);
      components[action].setState('available', false);
      if (action === 'bedroomSafe') {
      } else if (action === 'abstractArtFixed') {
      }
      break;
    case 'safeKeypadTimeout':
      components[action].setState('showItems', false);
      if (action === 'bedroomSafe') {
        components.inventory.setState('inventoryItems', 
        { ...components.inventory.state.inventoryItems, 'rope': {q: 1, image: 'bundle-rope.png', name: 'rope'}, 'bathroomKey': {q: 1, image:'key.webp', name: 'bathroomKey'}})
      } else if (action === 'abstractArtFixed') {
        components.inventory.setState('inventoryItems', 
        { ...components.inventory.state.inventoryItems, 'battery': {q: 1, image: 'battery.png', name: 'battery'}, 'livingroomKey': {q: 1, image:'key_vertical.png', name: 'livingroomKey'}})
      }
      break;
    // Ends Safe Keypad
    case 'abstractArtDynamic':
      components.bigAbstractArt.setState('isDynamic', true);
      components.bigAbstractArt.setState('show', true);
      components.inventory.setState('show', false);
      components.bigAbstractArt.setState('coords', getPuzzleAnswers().puzzleAbstractArt.coords);
      components.bigAbstractArt.setState('coordsAnswer', getPuzzleAnswers().puzzleAbstractArt.coordsAnswers);
      components.bigAbstractArt.setState('transformation', getPuzzleAnswers().puzzleAbstractArt.randomTransformation);
      break;
    case 'bigAbstractArt':
      components.inventory.setState('show', true);
      break;
    // BATHROOM COMPONENTS
    case 'abstractArtFixed':
      if(!content.isSolved) {
        components.bigAbstractArt.setState('isDynamic', false);
        components.bigAbstractArt.setState('show', true);
        components.inventory.setState('show', false);
        components.bigAbstractArt.setState('coords', getPuzzleAnswers().puzzleAbstractArt.coords);
        components.bigAbstractArt.setState('coordsAnswer', getPuzzleAnswers().puzzleAbstractArt.coordsAnswers);
        components.bigAbstractArt.setState('transformation', getPuzzleAnswers().puzzleAbstractArt.randomTransformation);
      } else {
        components.safeKeypad.setState('codeSolved', getPuzzleAnswers().mirrorCode.join(""));
        components.safeKeypad.setState('component', 'abstractArtFixed');
        components.safeKeypad.setState('codeNumbers', []);
        components.safeKeypad.setState('show', true);
        components.inventory.setState('show', false);
      }
      break;
    case 'abstractArtSolved':
      components.abstractArtFixed.setState('solved', true);
      sendCommand('abstractArtFixed', 'solved', true);
      break;
    case 'openNextDoorRoom':
      // components.abstractArtFixed.setState('solved', true);
      sendCommand('bathroomDoor', 'canIGoThrough', true);
      break;
    // GENERAL COMPONENTS
    case 'onItemUsed':
      console.log('content>');
      console.log('content', content);
      let inventoryItems = {...components.inventory.state.inventoryItems};
      console.log('inventoryItems', inventoryItems);
      inventoryItems[content.item].q -= content.num;
      components.inventory.setState(inventoryItems, inventoryItems);
      break;
    case 'changeEnvironment':
      if (content !== 'basement' && content !== 'freedom') {
        AudioModule.playOneShot({ source: asset("door_2.wav"), volume: 1 });
      }
      changeRoom(content);
      break;
    case 'puzzleAnswersReceived':
      components.mirrorCode.setState('mirrorCode', content.mirrorCode);
      break;
    case 'all':
      components[content.name].setState(content.key, content.value);
      break;
    }
  });
  return components;
};

module.exports = { _componentsMgmt };