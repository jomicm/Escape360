// State changes of all components of the game

const _componentsMgmt = (dataStore, ws) => {
  console.log('dataStore', dataStore);
  const componentsArray = ['hole', 'rope', 'basementPoster', 'bedroomPoster', 'bigPoster', 'phone', 'phoneNumpad', 'inventory', 'bedroomSafe', 'safeKeypad'];
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
    case 'rope':
      components.hole.setState('show', true);
      break;
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
      components.hole.setState('show', true);
      break;
    case 'bedroomSafe':
      components.safeKeypad.setState('show', true);
      components.inventory.setState('show', false);
      break;
    case 'safeKeypad':
      components.bedroomSafe.setState('index', content);
      sendCommand('bedroomSafe' ,'index', content);
      components.bedroomSafe.setState('showItems', true);
      components.bedroomSafe.setState('available', false);
      break;
    case 'all':
      components[content.name].setState(content.key, content.value);
      break;
    }
  });
  return components;
};

module.exports = { _componentsMgmt };