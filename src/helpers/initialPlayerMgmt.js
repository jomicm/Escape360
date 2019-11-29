import { componentsMgmt } from '../../index'

export default function initialRoomState(player) {
  if (player < 0) {
    return;
  }
  const initial = {
    0: ['basementPoster', 'bomb'], 
    1: ['hole', 'bedroomPoster', 'phone', 'bedroomSafe', 'bathroomDoor', 'livingroomDoor', 'abstractArtDynamic', 'banana']
  }
  initial[player].map(x => componentsMgmt[x].setState('show', true) )
}
