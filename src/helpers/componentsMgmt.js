// Show state of all components of the game

const _componentsMgmt = (dataStore) => {
  console.log('dataStore', dataStore);
  const components = {
    hole: {
      name: "hole",
    },
    rope: {
      name: "rope",
    },
    basementPoster: {
      name: "basement poster",
    },
    bigPoster: {
      name: "big poster",
    },
    phone: {
      name: "phone",
    },
    phoneNumpad: {
      name: "phone numpad",
    },
    inventory: {
      name: "inventory",
    },
    bedroomSafe: {
      name: "bedroom safe",
    },
    safeKeypad: {
      name: 'safe keypad',
    }
  };
  // dataStore.addListener('ropeClick', components.hole._onRopeClick);
  dataStore.addListener('globalListener', async(data) => {

    const { name, action, content } = data;
    switch (name) {
    case 'rope':
      components.hole.setState('show', true);
      break;
    case 'basementPoster':
      components.bigPoster.setState('show', true);
      components.bigPoster.setState('message', components.bigPoster.state.fixedMessage + '\n\n' + content);
      components.inventory.setState('show', false);
      break;
    case 'bedroomPoster':
      components.bigPoster.setState('show', true);
      components.bigPoster.setState('message', components.bigPoster.state.fixedMessage + '\n\n' + content);
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