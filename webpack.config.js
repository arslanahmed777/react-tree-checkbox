var path = require("path");
var baseConfig = {
  mode: "production",
  entry: "./main.js",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "react/jsx-runtime": "react/jsx-runtime",
  },
};

var esmConfig = {
  ...baseConfig,
  externalsType: "module",
  externals: {
    react: "module react",
    "react-dom": "module react-dom",
    "react/jsx-runtime": "module react/jsx-runtime",
  },
  target: ["web", "es2020"],
  output: {
    path: path.resolve("dist"),
    filename: "index.esm.js",
    library: {
      type: "module",
    },
    environment: {
      module: true,
    },
  },
  optimization: {
    concatenateModules: false,
  },
  experiments: {
    outputModule: true,
  },
};

var cjsConfig = {
  ...baseConfig,
  output: {
    path: path.resolve("dist"),
    filename: "index.cjs.bundle.js",
    library: {
      type: "commonjs2",
      export: "default",
    },
  },
};

module.exports = [esmConfig, cjsConfig];