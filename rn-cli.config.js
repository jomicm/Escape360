'use strict';

var path = require('path');
var blacklist = require('metro/src/blacklist');
// var blacklist = require('metro-config/src/defaults/blacklist');
// const blacklist = require('metro-config/src/defaults/blacklist');
// module.exports = {
//   // watchFolders: alternateRoots,
//   resolver: {
//     blacklistRE: blacklist
//   },
//   // transformer: {
//   //   babelTransformerPath: require.resolve('./scripts/transformer.js'),
//   // },
// };
var config = {
  getProjectRoots() {
    return getRoots();
  },

  getBlacklistRE() {
    return blacklist([
    ]);
  },

  getAssetExts() {
    return ['obj', 'mtl'];
  },

  getPlatforms() {
    return ['vr'];
  },

  getProvidesModuleNodeModules() {
    return ['react-native', 'react-360'];
  },
};

function getRoots() {
  var root = process.env.REACT_NATIVE_APP_ROOT;
  if (root) {
    return [path.resolve(root)];
  }
  return [path.resolve(__dirname)];
}

module.exports = config;