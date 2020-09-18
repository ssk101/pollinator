const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = function(socket) {
  return async function({ token }) {
    const rooms = ['chat']
    return socket.join(rooms)
  }
}