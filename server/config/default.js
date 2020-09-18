const ROOT = 'http://localhost'
const PORT = 3052
const WS_PORT = 9998

module.exports = {
  host: [ROOT, PORT].join(':'),
  root: [ROOT, PORT].join(':'),
  ws: [ROOT, WS_PORT].join(':'),
  wsPort: WS_PORT,
  port: PORT,
  title: 'Pollinator',
  favicon: 'favicon.png',
  apis: {

  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    db: +(process.env.REDIS_DATABASE || 0),
    sentinels: process.env.REDIS_SENTINELS || '',
    name: process.env.SENTINEL_MASTER || 'pollinator-master',
  },
}
