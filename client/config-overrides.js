const workboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  webpack: function (config, env) {
    if (env === 'production') {
      const workboxConfigProd = {
        swSrc: path.join(__dirname, 'public', 'service-worker.js'),
        swDest: 'service-worker.js',
        importWorkboxFrom: 'disabled',
      };
      config = removeSWPrecachePlugin(config);
      config.plugins.push(
        new workboxPlugin.InjectManifest(workboxConfigProd)
      );
    }
    return config;
  },
};

function removeSWPrecachePlugin(config) {
  const swPrecachePluginIndex = config.plugins.findIndex(
    (element) => {
      return element.constructor.name === 'SWPrecacheWebpackPlugin';
    }
  );
  if (swPrecachePluginIndex !== -1) {
    config.plugins.splice(swPrecachePluginIndex, 1);
  }
  return config;
}
