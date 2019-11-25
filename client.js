import { ReactInstance, Surface } from "react-360-web";
import componentsInfo from './src/helpers/globalComponents';

function init(bundle, parent, options = {}) {
  const width = window.innerWidth * 2.5;
  const height = window.innerHeight * 2.5;
  const globalComponents = componentsInfo(width, height);

  const fixedComponents = {};
  globalComponents.fixed.map(c => {
    fixedComponents[c.name] = new Surface(width, height, Surface.SurfaceShape.Flat);
    fixedComponents[c.name].setRadius(c.radius);
  });

  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    frame: () => {
      const cameraQuat = r360.getCameraQuaternion();
      Object.values(fixedComponents).map(fc => fc.recenter(cameraQuat, "all"));
    },
    ...options
  });

<<<<<<< HEAD
  // Rooms Surface
  const roomsSurface = new Surface(500, 600, Surface.SurfaceShape.Flat);
  r360.renderToSurface(r360.createRoot("Rooms", {}), roomsSurface);

  // // Bedroom Safe Surface
  // const bedroomSafeSurface = new Surface(300, 600, Surface.SurfaceShape.Flat);
  // bedroomSafeSurface.setAngle(Math.PI / 2 - 0.4, -0.45, 0.06);
  // bedroomSafeSurface.setRadius(5);
  // r360.renderToSurface(r360.createRoot("BedroomSafe", {}), bedroomSafeSurface);

  // // Poster Surface in Bedroom
  // const bedroomPosterSurface = new Surface(300, 600, Surface.SurfaceShape.Flat);
  // bedroomPosterSurface.setAngle(Math.PI - 0.58, -0.1, 0);
  // bedroomPosterSurface.setRadius(5);
  // r360.renderToSurface(
  //   r360.createRoot("PosterBedroom", {}),
  //   bedroomPosterSurface
  // );

  // // Poster Surface in Basement
  // const basementPosterSurface = new Surface(300, 600, Surface.SurfaceShape.Flat);
  // basementPosterSurface.setAngle(Math.PI / 2 - 0.37, -0.2, 0);
  // basementPosterSurface.setRadius(5);
  // r360.renderToSurface(r360.createRoot("Poster", {}), basementPosterSurface);

  // // Rope Surface
  // const myRopeSurface = new Surface(300, 600, Surface.SurfaceShape.Flat);
  // myRopeSurface.setAngle(-0.19, -0.27, 0);
  // r360.renderToSurface(r360.createRoot("Rope", {}), myRopeSurface);

  // // Hole Surface
  // const myHoleSurface = new Surface(500, 600, Surface.SurfaceShape.Flat);
  // myHoleSurface.setAngle(-1.5, -0.9, 0);
  // r360.renderToSurface(r360.createRoot("Hole", {}), myHoleSurface);

  // // Phone Surface
  // const myPhoneSurface = new Surface(500, 600, Surface.SurfaceShape.Flat);
  // myPhoneSurface.setAngle(1.99, -0.58, -0.13);
  // r360.renderToSurface(r360.createRoot("Phone", {}), myPhoneSurface);
  
  // Fixed SimonS Surface
  const simonFixedSurface = new Surface(200, 200, Surface.SurfaceShape.Flat);
  simonFixedSurface.setAngle(-0.452, 0.035, 0);
  r360.renderToSurface(r360.createRoot("SimonFixed", {}), simonFixedSurface);

  // // Render the fixed poster to a flat surface
  // r360.renderToSurface(
  //   r360.createRoot("BigPoster", { width, height, message: 'Some msg' }),
  //   bigPosterSurface
  // );

  // // Render the fixed phone numpad to a flat surface
  // r360.renderToSurface(
  //   r360.createRoot("Numbers", { width, height }),
  //   numpadSurface
  // );

  // // Render the fixed safe keypad to a flat surface
  // r360.renderToSurface(
  //   r360.createRoot("SafeKeypad", { width, height }),
  //   safeKeypadSurface
  // );
=======
  const components = {};
  globalComponents.general.map(c => {
    components[c.name] = new Surface(c.size.width, c.size.height, Surface.SurfaceShape.Flat);
    components[c.name].setAngle(...c.angle);
    if(c.radius) components[c.name].setRadius(c.radius);
    r360.renderToSurface(r360.createRoot(c.root, c.props), components[c.name]);
  });
  globalComponents.fixed.map(c => {
    r360.renderToSurface(r360.createRoot(c.name, c.props), fixedComponents[c.name]);
  });
>>>>>>> master

  // Load the initial environment
  // r360._cameraPosition = [0, 0, 0];
  r360.compositor.setBackground(r360.getAssetURL("360_living.png"));
}

window.React360 = { init };
