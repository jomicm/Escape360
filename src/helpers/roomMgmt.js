import { componentsMgmt } from '../../index'

export default function changeRoom(room) {

  const initial = {
    //  EASY TEST: REMOVE ROPE AT PRODUCTION. DO NOT TOUCH AGAIN.
    // 0: ['basementPoster', 'rope'],
    0: ['basementPoster'],
    1: ['hole', 'bedroomPoster', 'phone', 'bedroomSafe']
  }
  initial[player].map(x => componentsMgmt[x].setState('show', true) )
}
