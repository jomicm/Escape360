import { componentsMgmt } from '../../index'
import { Environment, asset } from 'react-360'

export default function changeRoom(room) {
console.log('room', room);

  const rooms = {
    basement: {
      components: ['inventory', 'basementPoster', 'rope'],
      environment: '360_basement.jpg'
    },
    bedroom: {
      components: ['inventory', 'hole', 'bedroomPoster', 'phone', 'bedroomSafe', 'bathroomDoor'],
      environment: '360_bedroom.jpg'
    },
    bathroom: {
      components: ['inventory', ],
      environment: '360_bathroom.jpg'
    },
    livingroom: {
      components: ['inventory', ],
      environment: '360_living.png'
    },
    freedom: {
      components: ['inventory', ],
      environment: ''
    }
  }
  Object.keys(componentsMgmt).map(c => componentsMgmt[c].setState('show', false))
  Environment.setBackgroundImage(asset(rooms[room].environment), {format: '2D', transition: 1000});
  setTimeout(() => {
    rooms[room].components.map(room => componentsMgmt[room].setState('show', true))
  }, 1000)


}
