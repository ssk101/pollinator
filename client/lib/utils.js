export function humanCase(str) {
  str || (str = '')
  return str
    .replace(/([A-Z])/g, (_, match) => ' ' + match.toLowerCase())
    .replace(/[_\- ]+(.)/g, ' $1')
    .trim()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

export function sentenceCase(str) {
  str || (str = '')
  return str
    .replace(/([A-Z])/g, (_, match) => ' ' + match.toLowerCase())
    .replace(/[_\- ]+(.)/g, ' $1')
    .trim()
}

export function camelCase(str) {
  return sentenceCase(str)
    .replace(/\s(.)/g, (_, match) => match.toUpperCase())
}

export function snakeCase(str) {
  return sentenceCase(str)
    .replace(/[ ]/g, '_')
}

export function kebabCase(str) {
  return sentenceCase(str)
    .replace(/[ ]/g, '-')
}

export function clamp(val, min, max) {
  return Math.max(+min, Math.min(+val, +max))
}
