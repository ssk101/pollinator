export default function input(property, klass, options = {}) {
  const prop = Symbol.for(property)
  return function define(Class) {
    Object.defineProperty(Class.prototype, property, {
      configurable: true,
      get() {
        if(typeof this[prop] === 'undefined' || this[prop] === null) {
          return options ? options.default : this[prop]
        }
        return this[prop]
      },
      set(value) {
        if(this[prop] === value) return

        const changeCallback = this[`${property}Change`]

        if(typeof changeCallback === 'function') {
          changeCallback.call(this, value, this[prop])
        }

        this.render(this[prop] = value)
      },
    })
  }
}
