const webpack = require('webpack')
let commitHash = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString();


const {
  override,
  addWebpackPlugin
} = require("customize-cra");


module.exports = override(
    addWebpackPlugin(
        new webpack.DefinePlugin({
          "process.env.COMMIT": JSON.stringify(commitHash),
        })
    )
);
