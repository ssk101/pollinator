import IO from 'socket.io-client'
import config from './config'

const socket = IO(config.ws, { transports: ['websocket'] })
const rooms = {}

socket.joinRooms = (data = {}) => {
  const payload = {}

  console.log('joining rooms: ', data)

  Object.keys(data).forEach(k => {
    if(!rooms[k]) rooms[k] = new Set()

    const before = Array.from(rooms[k])

    ;(data[k] || []).forEach(v => rooms[k].add(v))

    const diff = Array.from(rooms[k])
      .filter(r => !before.includes(r))

    if(diff.length) payload[k] = diff
  })

  if(Object.keys(payload).length) {
    socket.emit('subscribe:pollinator', payload)
  }
}

socket.leaveRooms = (data = {}, api) => {
  const payload = {}
  console.log('leaving rooms: ', data)
  Object.keys(data).forEach(k => {
    if(!rooms[k]) return
    data[k].forEach(v => rooms[k].delete(v))
    payload[k] = data[k].length ? data[k] : [...rooms[k]]
  })
  socket.emit('unsubscribe:pollinator', data)
}

socket.on('connect', () => {
  console.log('socket connected')
})

socket.on('disconnect', () => {
  console.log('socket disconnected')
  socket.connect()
})

export default socket
