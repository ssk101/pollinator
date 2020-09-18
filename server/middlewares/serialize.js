const { camelCase } = require('../lib/utils.js')

function camelize(obj) {
  if(Array.isArray(obj)) {
    return obj.map(v => camelize(v))
  } else if(obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelize(obj[key]),
      }),
      {},
    )
  }
  return obj
}

module.exports = function(cb) {
  return async function(req, res, next) {
    try {
      const response = await cb(req, res, next)
      const resp = camelize(response)

      if(Buffer.isBuffer(resp)) {
        res.type('json')
          .set('Content-Encoding', 'gzip')
          .send(resp)
      } else {
        res.json(resp)
      }
    } catch (err) {
      err.name = 'serialize'
      const error = {
        payload: req.payload,
        errors: err,
        httpRequest: {
          requestMethod: req.method,
          requestUrl: req.baseUrl,
          status: err.status,
          referer: req.get('referer'),
          userAgent: req.get('user-agent'),
          remoteIp: req.ip,
        },
      }

      next(error)
    }
  }
}
