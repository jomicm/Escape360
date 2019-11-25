module.exports = (width, height) => {
  return {
    fixed: [
      { name: 'BigPoster', props: { width, height, message: 'Some msg' }, radius: 3.4 },
      { name: 'PhoneNumpad', props: { width, height }, radius: 3.4 },
      { name: 'SafeKeypad', props: { width, height }, radius: 3.4 },
      { name: 'Inventory', props: { width, height }, radius: 8 }
    ],
    general: [
      { name: 'bedroomSafeSurface', root:'BedroomSafe', props: {}, size: { width: 300, height: 600 }, angle: [Math.PI / 2 - 0.4, -0.45, 0.06], radius: 5 },
      { name: 'bedroomPosterSurface', root:'PosterBedroom', props: {}, size: { width: 300, height: 600 }, angle: [Math.PI - 0.58, -0.1, 0], radius: 5 },
      { name: 'basementPosterSurface', root:'Poster', props: {}, size: { width: 300, height: 600 }, angle: [Math.PI / 2 - 0.37, -0.2, 0], radius: 5 },
      { name: 'myRopeSurface', root:'Rope', props: {}, size: { width: 300, height: 600 }, angle: [-0.19, -0.27, 0], radius: 0 },
      { name: 'myHoleSurface', root:'Hole', props: {}, size: { width: 500, height: 600 }, angle: [-1.5, -0.9, 0], radius: 0 },
      { name: 'myPhoneSurface', root:'Phone', props: {}, size: { width: 500, height: 600 }, angle: [1.99, -0.58, -0.13], radius: 0 },
      { name: 'myBathroomDoorSurface', root:'NextRoomDoor', props: { component: 'bathroomDoor', selectedItem: 'bathroomKey', room: 'bathroom' }, size: { width: 230, height: 150 }, angle: [-Math.PI / 3 - 0.37, -0.02, 0], radius: 0 },
      { name: 'myLivingroomDoorSurface', root:'NextRoomDoor', props: { component: 'livingroomDoor', selectedItem: 'bathroomKey', room: 'livingroom' }, size: { width: 300, height: 160 }, angle: [-Math.PI / 2 - 0.85, -0.05, 0], radius: 0 },
      { name: 'myGoBackDoorSurface', root:'GoBackDoor', props: { component: 'goBackDoor', room: 'bedroom' }, size: { width: 300, height: 180 }, angle: [-Math.PI + 0.8, -0.25, 0], radius: 0 },
    ]
  };
};