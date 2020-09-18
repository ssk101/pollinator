import { kebabCase } from './utils.js'

export function object2Style(obj) {
  if(!obj) return ''
  if(typeof obj === 'string') {
    return obj
  }

  return Object.keys(obj).reduce((acc, tag) => {
    const value = obj[tag]
    if(!tag.startsWith('--')) {
      tag = kebabCase(tag)
    }
    acc += `${tag}:${value};`
    return acc
  }, '')
}

export function varsToHexadecimal(obj, raw) {
  return Object.keys(obj).reduce((acc, val) => {
    acc[val] = +`0x${+raw[`--${obj[val]}`].replace(/#/, '')}`
    return acc
  }, {})
}
