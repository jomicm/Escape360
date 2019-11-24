import { ReactInstance, Surface } from "react-360-web";

function init(bundle, parent, options = {}) {
  const width = window.innerWidth * 2.5;
  const height = window.innerHeight * 2.5;

  const bigPosterSurface = new Surface(width, height, Surface.SurfaceShape.Flat);
  bigPosterSurface.setRadius(3.4);

  const numpadSurface = new Surface(width, height, Surface.SurfaceShape.Flat);
  numpadSurface.setRadius(3.4);

  const safeKeypadSurface = new Surface(width, height, Surface.SurfaceShape.Flat);
  safeKeypadSurface.setRadius(3.4);

  const inventorySurface = new Surface(width, height, Surface.SurfaceShape.Flat);
  inventorySurface.setRadius(8);

  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    frame: () => {
      const cameraQuat = r360.getCameraQuaternion();
      bigPosterSurface.recenter(cameraQuat, "all");
      numpadSurface.recenter(cameraQuat, "all");
      safeKeypadSurface.recenter(cameraQuat, "all");
      inventorySurface.recenter(cameraQuat, "all");
    },
    ...options
  });

  // Rooms Surface
  const roomsSurface = new Surface(500, 600, Surface.SurfaceShape.Flat);
  r360.renderToSurface(r360.createRoot("Rooms", {}), roomsSurface);

  // Bedroom Safe Surface
  const bedroomSafeSurface = new Surface(300, 600, Surface.SurfaceShape.Flat);
  bedroomSafeSurface.setAngle(Math.PI / 2 - 0.4, -0.45, 0.06);
  bedroomSafeSurface.setRadius(5);
  r360.renderToSurface(r360.createRoot("BedroomSafe", {}), bedroomSafeSurface);

  // Bedroom Poster Surface
  const bedroomPosterSurface = new Surface(300, 600, Surface.SurfaceShape.Flat);
  bedroomPosterSurface.setAngle(Math.PI - 0.58, -0.1, 0);
  bedroomPosterSurface.setRadius(5);
  r360.renderToSurface(
    r360.createRoot("PosterBedroom", {}),
    bedroomPosterSurface
  );

  // Poster Surface in Basement
  const basementPosterSurface = new Surface(300, 600, Surface.SurfaceShape.Flat);
  basementPosterSurface.setAngle(Math.PI / 2 - 0.37, -0.2, 0);
  basementPosterSurface.setRadius(5);
  r360.renderToSurface(r360.createRoot("Poster", {}), basementPosterSurface);

  // Rope Surface
  const myRopeSurface = new Surface(300, 600, Surface.SurfaceShape.Flat);
  myRopeSurface.setAngle(-0.19, -0.27, 0);
  r360.renderToSurface(r360.createRoot("Rope", {}), myRopeSurface);

  // Hole Surface
  const myHoleSurface = new Surface(500, 600, Surface.SurfaceShape.Flat);
  myHoleSurface.setAngle(-1.5, -0.9, 0);
  r360.renderToSurface(r360.createRoot("Hole", {}), myHoleSurface);

  // Phone Surface
  const myPhoneSurface = new Surface(500, 600, Surface.SurfaceShape.Flat);
  myPhoneSurface.setAngle(1.99, -0.58, -0.13);
  r360.renderToSurface(r360.createRoot("Phone", {}), myPhoneSurface);

  // Bathroom door in bedroom
  // const myBathroomDoorSurface = new Surface(230, 150, Surface.SurfaceShape.Flat);
  // myBathroomDoorSurface.setAngle(-Math.PI/3 - 0.37, -0.02, 0);
  // r360.renderToSurface(r360.createRoot("BathroomDoor", {}), myBathroomDoorSurface);

  // Bathroom door in bedroom
  const myBathroomDoorSurface = new Surface(230, 150, Surface.SurfaceShape.Flat);
  myBathroomDoorSurface.setAngle(-Math.PI/3 - 0.37, -0.02, 0);
  // r360.renderToSurface(r360.createRoot("NextRoomDoor", { component: 'bathroomDoor', selectedItem: 'bathroomKey'}), myBathroomDoorSurface);
  r360.renderToSurface(r360.createRoot("NextRoomDoor", { component: 'bathroomDoor', selectedItem: 'bathroomKey', room: 'bathroom' }), myBathroomDoorSurface);


  // Livingroom door in bedroom
  const myLivingroomDoorSurface = new Surface(300, 160, Surface.SurfaceShape.Flat);
  myLivingroomDoorSurface.setAngle(-Math.PI/2 -0.85, -0.05, 0);
  r360.renderToSurface(r360.createRoot("NextRoomDoor", { component: 'livingroomDoor', selectedItem: 'bathroomKey', room: 'livingroom' }), myLivingroomDoorSurface);

  // go back door to bedroom from bathroom
  const myGoBackDoorSurface = new Surface(300, 180, Surface.SurfaceShape.Flat);
  myGoBackDoorSurface.setAngle(-Math.PI + 0.8, -0.25, 0);
  r360.renderToSurface(r360.createRoot("GoBackDoor", { component: 'goBackDoor', room: 'bedroom' }), myGoBackDoorSurface);
  
  // Render the fixed poster to a flat surface
  r360.renderToSurface(
    r360.createRoot("BigPoster", { width, height, message: 'Some msg' }),
    bigPosterSurface
  );

  // Render the fixed phone numpad to a flat surface
  r360.renderToSurface(
    r360.createRoot("PhoneNumpad", { width, height }),
    numpadSurface
  );

  // Render the fixed safe keypad to a flat surface
  r360.renderToSurface(
    r360.createRoot("SafeKeypad", { width, height }),
    safeKeypadSurface
  );

  // Render the inventory to a flat surface
  r360.renderToSurface(
    r360.createRoot("Inventory", { width, height }),
    inventorySurface
  );

  // Load the initial environment
  // r360._cameraPosition = [0, 0, 0];
  r360.compositor.setBackground(r360.getAssetURL("360_basement.jpg"));
}

window.React360 = { init };
