import type { StorybookConfig } from '@storybook/nextjs'

const path = require('path')
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../public'],
  webpackFinal(config) {
    // NOTE: tsconfig.jsonの設定をstorybookでも有効にする
    if (!config.resolve) return config

    config.resolve.modules = [
      ...(config.resolve?.modules || []),
      path.resolve(__dirname, '../src')
    ]

    config.resolve.plugins = [
      ...(config.resolve?.plugins || []),
      new tsconfigPathsPlugin()
    ]
    return config
  }
}
export default config
