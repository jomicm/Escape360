import { componentsMgmt } from '../../index'
import { Environment, asset } from 'react-360'

export default function changeRoom(room) {
console.log('room', room);

  const rooms = {
    basement: {
      components: ['inventory', 'basementPoster', 'rope', 'bomb', 'chest'],
      environment: '360_basement.jpg'
    },
    bedroom: {
      components: ['inventory', 'hole', 'bedroomPoster', 'phone', 'bedroomSafe', 'bathroomDoor', 'livingroomDoor', 'abstractArtDynamic', 'banana'],
      environment: '360_bedroom.jpg'
    },
    bathroom: {
      components: ['inventory', 'backFromBathroom', 'abstractArtFixed', 'mirrorCode'],
      environment: '360_bathroom.jpg'
    },
    livingroom: {
      components: ['inventory', 'backFromLivingroom', 'simonFixed', 'simonDynamic'],
      environment: '360_living.png'
    },
    freedom: {
      components: ['inventory', ],
      environment: '360_world.jpg'
    }
  }
  // console.log('componentsMgmt', componentsMgmt);
  Object.keys(componentsMgmt).map(c => {
    console.log('c', c);
    componentsMgmt[c].setState('show', false)
  });
  Environment.setBackgroundImage(asset(rooms[room].environment), {format: '2D', transition: 1000});
  setTimeout(() => {
    rooms[room].components.map(room => componentsMgmt[room].setState('show', true))
  }, 1000)


}
