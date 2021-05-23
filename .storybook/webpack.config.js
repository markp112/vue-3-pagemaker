const path = require('path');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const tailwindcss = require("tailwindcss");

module.exports = ({ config, mode }) => {

  config.module.rules.push({
    test: /\.css$/,
    loaders: [
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: './.storybook/',
          },
        },
        loader: 'css-loader',
        options: {
          esModule: false,
        }
      },
    ],
    include: path.resolve(__dirname, '../storybook/'),
    resolve: {
      alias : {
        '@': path.resolve(__dirname, '../src'),
      }
    }
  });
  config.resolve.plugins.push(new TsconfigPathsPlugin({}));
  return config;
};
