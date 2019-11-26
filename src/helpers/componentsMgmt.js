import changeRoom from './roomMgmt';
import SimonFixed from '../../components/SimonFixed';

// State changes of all components of the game

const _componentsMgmt = (dataStore, ws) => {
  console.log('dataStore', dataStore);
  const componentsArray = ['hole', 'rope', 'basementPoster', 'bedroomPoster', 'bigPoster', 'phone', 'phoneNumpad', 'inventory', 'bedroomSafe', 'safeKeypad', 'bathroomDoor', 'livingroomDoor', 'goBackDoor', 'simonFixed', 'simonDynamic', 'ghost'];
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
    // case 'rope':
    //   //components.hole.setState('show', true);
    //   changeRoom('bedroom');
    //   break;
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
      if (action === 'showRope') {
        sendCommand('rope', 'show', true);
        sendCommand('hole', 'canIGoThrough', true);
        break;
      }
      // } else if (action === 'goThrough') {
      //   changeRoom('basement');
      // }
      // components.hole.setState('show', true);
      break;
    case 'bedroomSafe':
      components.safeKeypad.setState('show', true);
      components.inventory.setState('show', false);
      break;
    case 'safeKeypad':
      components.bedroomSafe.setState('index', content);
      sendCommand('bedroomSafe', 'index', content);
      sendCommand('bedroomSafe', 'available', false);
      components.bedroomSafe.setState('showItems', true);
      components.bedroomSafe.setState('available', false);
      break;
    case 'simonAnswers':
      components.simonDynamic.setState('simonCode', content.simonCode);
      sendCommand('simonDynamic', 'simonCode', content.simonCode);
      components.ghost.setState('bombCode', content.bombCode);
      sendCommand('ghost', 'bombCode', content.bombCode);
      break;
    case 'simonSolved':
      sendCommand('simonDynamic', 'solved', content);
      sendCommand('ghost', 'show', content);
      components.ghost.setState('show', content);
      break;
    case 'changeEnvironment':
        changeRoom(content);
        if (content === 'livingroom') {
          components.simonFixed.state.startFunction();
        }
        break;
    case 'all':
      components[content.name].setState(content.key, content.value);
      break;
    }
  });
  return components;
};

module.exports = { _componentsMgmt };