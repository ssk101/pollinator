const router = require('express').Router()
const apicache = require('apicache-plus')

router.get('/search', apicache('1 day'), require('./movies/search'))

module.exports = router
