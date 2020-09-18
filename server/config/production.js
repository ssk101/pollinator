const ROOT = 'https://api.pollinator.app'
const WS = 'https://ws.pollinator.app'
const PORT = 3052
const WS_PORT = 9998

module.exports = {
  host: ROOT,
  root: ROOT,
  ws: WS,
  wsPort: WS_PORT,
  port: PORT,
  title: 'Pollinator',
  favicon: 'favicon.png',
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    db: +(process.env.REDIS_DATABASE || 0),
    sentinels: process.env.REDIS_SENTINELS || '',
    name: process.env.SENTINEL_MASTER || 'pollinator-master',
  },
  robots: {
    enabled: false,
  },
  production: true,
}
