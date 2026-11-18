/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

// <project>/functions is the Firebase Cloud Functions server code with its own node_modules;
// it must never be bundled into the app (only that folder, not packages named "functions")
const functionsDir = path.resolve(__dirname, 'functions').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = {
  resolver: {
    blockList: exclusionList([new RegExp(`^${functionsDir}[\\/\\\\].*`)]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
