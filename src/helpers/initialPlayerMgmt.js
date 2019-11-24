import { componentsMgmt } from '../../index'

export default function initialRoomState(player) {
  if (player < 0) {
    return;
  }
  const initial = {
    //  EASY TEST: REMOVE ROPE AT PRODUCTION. DO NOT TOUCH AGAIN.
    // 0: ['basementPoster', 'rope'],
    0: ['basementPoster', 'bathroomDoor'],
    1: ['hole', 'bedroomPoster', 'phone', 'bedroomSafe', 'bathroomDoor']
  }
  initial[player].map(x => componentsMgmt[x].setState('show', true) )
}
