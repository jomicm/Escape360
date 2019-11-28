import { ReactInstance, Surface } from "react-360-web";
import componentsInfo from './src/helpers/globalComponents';

function init(bundle, parent, options = {}) {
  // console.log('AUDIO FROM CLIENT>>>', window.AudioContext);
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

  // Load the initial environment
  // r360._cameraPosition = [0, 0, 0];
  r360.compositor.setBackground(r360.getAssetURL(globalComponents.initialEnvironment));
}

window.React360 = { init };
