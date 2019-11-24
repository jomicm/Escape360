// State changes of all components of the game

const _componentsMgmt = (dataStore) => {
  console.log('dataStore', dataStore);
  const componentsArray = ['hole', 'rope', 'basementPoster', 'bedroomPoster', 'bigPoster', 'phone', 'phoneNumpad', 'inventory', 'bedroomSafe', 'safeKeypad'];
  const components = {};
  componentsArray.map(c => components[c] = {name: c});

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
    }
  });
  return components;
};

module.exports = { _componentsMgmt };