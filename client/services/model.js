import qs from 'qs'
import config from './config'

export async function load(endpoint, params = {}) {
  const response = await fetch(
    `${config.root}/${endpoint}?${format(params)}`
  )
  if(response.ok) {
    var data = await response.json()
    return data
  } else {
    throw new Error(response.statusText)
  }
}

function format(params) {
  return qs.stringify(params, {
    arrayFormat: 'brackets',
    encode: false,
  })
}
