const fetch = require('node-fetch')
const qs = require('qs')
const error = require('http-errors')
const config = require('../../config')
const { secret } = config.apis.imdb || {}

async function get(path, params = {}) {
  check({ path, ...params })

  // var endpoint = params.img
  //   ? `${imgApi}/${path}`
  //   : `${api}/${path}?${qs.stringify(params, {
  //       arrayFormat: 'brackets',
  //       encode: false,
  //     })}`

  // console.log(endpoint)
  // return fetch(endpoint, {
  //   headers: {
  //     Authorization: `Bearer ${secret}`,
  //   },
  // })
}

function check(params) {
  if(!api) {
    throw error
      .BadRequest('Missing something')
  }
  if(!params.path) {
    throw error
      .BadRequest('Missing something')
  }
  if(!secret) {
    throw error
      .InternalServerError('Missing something')
  }
}

module.exports = {
  get,
}
