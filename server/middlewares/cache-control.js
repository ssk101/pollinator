module.exports = function cacheControl(opts = {}) {
  const items = []
  items.push(`max-age=${opts.age || opts.ttl || 15}`)
  items.push(opts.private ? 'private' : 'public')
  if(opts.age && opts.ttl && opts.age !== opts.ttl) {
    items.push(`s-maxage=${opts.ttl || 15}`)
  }
  if(opts.lazy) {
    if(opts.lazy === true) {
      items.push('stale-while-revalidate')
    } else {
      items.push(`stale-while-revalidate=${opts.lazy}`)
    }
  }

  return function(req, res, next) {
    res.setHeader('Cache-Control', items.join(', '))
    next()
  }
}
