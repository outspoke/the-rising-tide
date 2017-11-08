const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const urlJoin = require('url-join');
const { argv } = require('yargs');

const jekyllConfig = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
const isProduction = !!((argv.env && argv.env.production) || argv.p);

module.exports = {
  paths: {
    root: process.cwd(),
    src: path.resolve( __dirname, './src/_assets' ),
    dist: path.resolve( __dirname, './dist/assets' ),
  },
  entry: {
    app: ['./js/app.js', './css/app.scss'],
  },
  copy: [
    {
      from: 'img/**/*',
      to: '[path][name].[ext]',
    },
  ],
  enabled: {
    sourceMaps: !isProduction,
    optimize: isProduction,
    watcher: !!argv.watch,
  },
  env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
  devUrl: urlJoin('http://127.0.0.1:4000', jekyllConfig.baseurl, '/'),
  proxyUrl: 'http://localhost:3000',
  watch: [
    "dist/**/*.html",
  ],
  open: true,
  publicPath: path.join(jekyllConfig.baseurl, '/assets/'),
}

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = isProduction ? 'production' : 'development';
}
