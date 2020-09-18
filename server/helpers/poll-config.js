const config = require('../config')
const _ = require('lodash')

module.exports = () => {
  const defaults = {
    root: config.root,
    api: config.api,
    ws: config.ws,
    port: config.port,
    wsPort: config.wsPort,
    apis: {

    },
  }

  return _.mapKeys(defaults, (v, k) => `data-${_.kebabCase(k)}`)
}
