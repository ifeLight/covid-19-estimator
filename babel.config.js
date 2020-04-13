/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    require('@babel/plugin-transform-runtime'),
    ['transform-es2015-modules-commonjs', {
      allowTopLevelThis: true
    }],
    require('@babel/plugin-transform-async-to-generator'),
    require('@babel/plugin-syntax-dynamic-import'),
    require('babel-plugin-dynamic-import-node-sync'),
    require('@babel/plugin-syntax-import-meta'),
    require('@babel/plugin-proposal-class-properties'),
    require('@babel/plugin-proposal-json-strings'),
    require('babel-plugin-add-module-exports')
  ]
};
