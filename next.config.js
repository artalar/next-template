const withPrefresh = require('@prefresh/next')
const withCSS = require('@zeit/next-css')

let config = {
  experimental: {
    modern: true,
    polyfillsOptimization: true,
  },
  typescript: {
    ignoreDevErrors: true,
  },

  webpack(config, { dev, isServer }) {
    config.resolve.alias['~'] = require('path').resolve(__dirname, 'src')

    const splitChunks = config.optimization && config.optimization.splitChunks
    if (splitChunks) {
      const cacheGroups = splitChunks.cacheGroups
      const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
      if (cacheGroups.framework) {
        cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
          test: preactModules,
        })
        cacheGroups.commons.name = 'framework'
      } else {
        cacheGroups.preact = {
          name: 'commons',
          chunks: 'all',
          test: preactModules,
        }
      }
    }

    // Install webpack aliases:
    const aliases = config.resolve.alias || (config.resolve.alias = {})
    aliases.react = aliases['react-dom'] = 'preact/compat'

    // inject Preact DevTools
    if (dev && !isServer) {
      const entry = config.entry
      config.entry = () =>
        entry().then((entries) => {
          entries['main.js'] = ['preact/debug'].concat(entries['main.js'] || [])
          return entries
        })
    }

    /* reshadow */
    if (process.env.NODE_ENV === 'production') {
      config.module.rules.push({
        enforce: 'post',
        test: /\.tsx?$/,
        loader: 'reshadow/webpack/loader',
        options: {
          modules: true,
        },
      })
    }

    return config
  },
}

config = withPrefresh(config)

if (process.env.NODE_ENV === 'production') config = withCSS(config)

module.exports = config
