const moment = require('moment')
const { DEBUG } = process.env

class DevLog {
  constructor(namespace) {
    this.namespace = namespace

    return this.log.bind(this)
  }

  log(...args) {
    if(DEBUG === this.namespace) {
      console.log(moment()
        .format('YYYY/MM/DD HH:mm:ss'), `${this.namespace}:`, ...args)
    }
  }
}

module.exports = DevLog