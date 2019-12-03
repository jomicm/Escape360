import { componentsMgmt } from '../../index'

export default function initialRoomState(player) {
  if (player < 0) {
    return;
  }
  const initial = {
    0: ['basementPoster', 'bomb', 'crowbar', 'chest' ], 
    1: ['hole', 'bedroomPoster', 'phone', 'bedroomSafe', 'bathroomDoor', 'livingroomDoor', 'abstractArtDynamic']
  }
  initial[player].map(x => componentsMgmt[x].setState('show', true) )
}
