export default {
  "entry": {
    app: "./src/index.js",
    common: "./src/vendor.js"
  },
  multipage: true,
  "publicPath": "/static/",
  "theme": "./theme.config.js" ,
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", [{"libraryName": "antd", "libraryDirectory": "lib", "style": true}]]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", [{"libraryName": "antd", "libraryDirectory": "lib", "style": true}]]
      ]
    }
  }
}
