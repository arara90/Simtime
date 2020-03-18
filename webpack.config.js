// load babel load
module.exports = {
  entry: {
    main: ["@babel/polyfill", "./Simtime/frontend/src/index.js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/, //any js files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
