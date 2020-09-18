const config = require('../config')
const logger = require('pino')({
  name: 'ws',
  base: {},
  useLevelLabels: true,
})
const http = require('http')
const redisAdapter = require('socket.io-redis')
const Redis = require('ioredis')
const roomsHandler = require('./handlers/rooms')
const IO = require('socket.io')

return (async function() {
  const pubClient = Redis.createClient(config.redis.url)
  const subClient = Redis.createClient(config.redis.url)

  const server = http.createServer((req, res) => {
    if(req.url === '/health') {
      pubClient.ping((err, data) => {
        if(err) {
          res.writeHead(500)
          res.end('error')
        } else {
          res.writeHead(200)
          res.end('healthy')
        }
      })
    } else if(req.url === '/ping') {
      res.writeHead(200)
      res.end('OK')
    } else {
      res.writeHead(404)
    }
  })

  const io = IO(server, {
    serveClient: true,
    adapter: redisAdapter({ pubClient, subClient }),
    transports: ['websocket'],
    cookie: false,
  })

  io.on('connection', socket => {
    console.log('socket connected')
    socket.on('disconnect', () => {
      console.log('socket disconnect')
    })

    socket.on('subscribe:pollinator', roomsHandler.subscribe(io, socket))
    socket.on('unsubscribe:pollinator', roomsHandler.unsubscribe(io, socket))
  })

  server.listen(config.wsPort, () => {
    console.log({ event: 'listening', port: config.wsPort })
  })

  var exit = (e) => {
    console.log('BYE', e)
    logger.info({event: 'signal'})
    io.close(() => {
      logger.info({event: 'exiting'})
      process.exit()
    })
  }

  process.on('SIGTERM', (e) => exit(e))
  process.on('SIGINT', (e) => exit(e))
})()
