module.exports = (width, height) => {
  return {
    fixed: [
      { name: 'BigPoster', props: { width, height, message: 'Some msg' }, radius: 3.4 },
      { name: 'PhoneNumpad', props: { width, height }, radius: 3.4 },
      { name: 'SafeKeypad', props: { width, height }, radius: 3.4 },
      { name: 'BigAbstractArt', props: { width, height }, radius: 3.4 },
      { name: 'Inventory', props: { width, height }, radius: 8 },
    ],
    general: [
      { name: 'bedroomSafeSurface', root:'BedroomSafe', props: {}, size: { width: 300, height: 600 }, angle: [Math.PI / 2 - 0.4, -0.45, 0.06], radius: 5 },
      { name: 'bedroomPosterSurface', root:'PosterBedroom', props: {}, size: { width: 300, height: 600 }, angle: [Math.PI - 0.58, -0.1, 0], radius: 5 },
      { name: 'basementPosterSurface', root:'Poster', props: {}, size: { width: 300, height: 600 }, angle: [Math.PI / 2 - 0.37, -0.2, 0], radius: 5 },
      { name: 'myRopeSurface', root:'Rope', props: {}, size: { width: 300, height: 600 }, angle: [-0.19, -0.27, 0], radius: 0 },
      { name: 'myHoleSurface', root:'Hole', props: {}, size: { width: 500, height: 600 }, angle: [-1.5, -0.9, 0], radius: 0 },
      { name: 'myPhoneSurface', root:'Phone', props: {}, size: { width: 500, height: 600 }, angle: [1.99, -0.58, -0.13], radius: 0 },
      { name: 'myBathroomDoorSurface', root:'NextRoomDoor', props: { component: 'bathroomDoor', selectedItem: 'bathroomKey', room: 'bathroom' }, size: { width: 230, height: 150 }, angle: [-Math.PI / 3 - 0.37, -0.02, 0], radius: 0 },
      { name: 'myLivingroomDoorSurface', root:'NextRoomDoor', props: { component: 'livingroomDoor', selectedItem: 'livingroomKey', room: 'livingroom' }, size: { width: 300, height: 160 }, angle: [-Math.PI / 2 - 0.85, -0.05, 0], radius: 0 },
      { name: 'myGoBackFromBathroomSurface', root:'GoBackDoor', props: { component: 'backFromBathroom', room: 'bedroom' }, size: { width: 300, height: 180 }, angle: [-Math.PI + 0.8, -0.25, 0], radius: 0 },
      { name: 'myGoBackFromLivingroomSurface', root:'GoBackDoor', props: { component: 'backFromLivingroom', room: 'bedroom' }, size: { width: 200, height: 140 }, angle: [Math.PI - 1.685, -0.1, 0], radius: 0 },
      { name: 'myAbstractArtFixedSurface', root:'AbstractArtFixed', props: {}, size: { width: 145, height: 200 }, angle: [0.8, 0.15, -0.01], radius: 5 },
      { name: 'myAbstractArtDynamicSurface', root:'AbstractArtDynamic', props: {}, size: { width: 310, height: 325 }, angle: [-.87, .165, 0.0], radius: 5 },
      { name: 'mirrorCodeSurface', root:'MirrorCode', props: {}, size: { width: 200, height: 200 }, angle: [-0.24, 0.22, 0.0], radius: 5 },
      { name: 'mySimonFixedSurface', root: 'SimonFixed', size: { width: 200, height: 200 }, angle: [-0.452, 0.035, 0], radius: 0},
      { name: 'mySimonDynamicSurface', root: 'SimonDynamic', size: { width: 600, height: 600 }, angle: [-0.39 - Math.PI, 0.12, 0], radius: 0},
      { name: 'myBombSurface', root: 'Bomb', size: { width: 500, height: 500 }, angle: [-0.58 - Math.PI, -0.09, 0], radius: 0},
      { name: 'myGhostSurface', root: 'Ghost', size: { width: 320, height: 400 }, angle: [-0.75, -0.04, 0], radius: 5},
      { name: 'myEscapeTheRoomSurface', root:'BlackHole', props: { }, size: { width: 200, height: 200 }, angle: [-Math.PI + 0.75, -0.25, 0], radius: 0 },
    ],
    initialEnvironment: '360_living.png',
  };
};