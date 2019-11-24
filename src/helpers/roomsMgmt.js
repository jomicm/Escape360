import { componentsMgmt } from '../../index'

export default function initialRoomState(player) {
  console.log(componentsMgmt);
  // const roomsArray = ['basement', 'bedroom', 'bathroom', 'livingroom']
  if (player < 0) {
    return;
  }
  const initial = {
    //  EASY TEST: REMOVE ROPE AT PRODUCTION. DO NOT TOUCH AGAIN.
    0: ['basementPoster', 'rope'],
    1: ['hole', 'bedroomPoster', 'phone', 'bedroomSafe']
  }
  initial[player].map(x => console.log('compmgmt', componentsMgmt[x]))
  initial[player].map(x => componentsMgmt[x].setState('show', true) )
}

  // const rooms = {
    // 0: {
    //   basementPoster: {
    //     component: componentsMgmt.poster,
    //     props: [{ show: true }]
    //   },
    //   bigPoster: {
    //     component: componentsMgmt.bigPoster,
    //     props: [{ show: false }]
    //   },
    //   rope: {
    //     component: componentsMgmt.rope,
    //     //EASY TESTING
    //     props: [{ show: true }]
    //   }
    // },
    // 1: {
    //   hole: {
    //     component: componentsMgmt.hole,
    //     props: [{ show: true }]
    //   },
    //   bedroomPoster: {
    //     component: componentsMgmt.bedroomPoster,
    //     props: [{ show: true }]
    //   },
    //   bigPoster: {
    //     component: componentsMgmt.bigPoster,
    //     props: [{ show: false }]
    //   },
    //   phone: {
    //     component: componentsMgmt.phone,
    //     props: [{ show: true }]
    //   },
    //   phoneKeypad: {
    //     component: componentsMgmt.phoneKeypad,
    //     props: [{ show: false }]
    //   },
    //   bedroomSafe: {
    //     component: componentsMgmt.bedroomSafe,
    //     props: [{ show: true, showItems: false }]
    //   },
    //   safeNumpad: {
    //     component: componentsMgmt.safeNumpad,
    //     props: [{ show: false }]
    //   },
    // }

//   for (let key in rooms) {
//     for (let component in rooms[key]) {
//       // for (let prop in rooms[key].props[prop])
//     // component.setState('show', false);
//   }
// }