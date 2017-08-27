const fs = require('fs');
const path = require('path');
const urlLoader = require('url-loader');

require('babel-register');

require("babel-polyfill");

require('css-modules-require-hook')({
  rootDir: path.join(__dirname, '_-', '_-', '_-'),
  generateScopedName: '[local]___[hash:base64:5]',
  extensions: ['.css','.less'],
});

function imgHook(source, filename) {
  const buffer = fs.readFileSync(filename);
  const res = urlLoader.bind({
    query: {
      limit: 1000,
      name: 'assets/static/[name].[hash:8].[ext]',
    },
    resourcePath: filename,
    options: {},
  })(buffer);
  return res;
}

require('node-hook').hook('.jpg', imgHook);

require('./server');
