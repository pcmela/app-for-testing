var dest = './build',
  src = './src',
  mui = './node_modules/material-ui/src';

module.exports = {
  browserSync: {

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:4000',

    // open the proxied app in chrome
    browser: ['google-chrome'],

    files: [
      dest + '/**'
    ]
  },
  markup: {
    src: src + "/www/**",
    dest: dest
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/app.jsx',
      dest: dest,
      outputName: 'app.js'
    }],
    extensions: ['.jsx'],
  }
};
