import { Component, Template, Attribute } from '@scoutgg/widgets/esm/index.js'
import template from './search.pug'

@Component('poll')
@Template(template)
@Attribute('search', String)
@Attribute('type', String)
@Attribute('min', Number)
@Attribute('max', Number)
@Attribute('maxlength', Number)
@Attribute('disabled', Boolean)
export default class Search extends HTMLElement {
  created() {
    Object.defineProperty(this, 'value', {
      set(val) {
        this.$value = val
        var input = this.input
        if(input && input.value != val) input.value = this.value || ''
        this.render()
      },
      get() {
        var val = this.$value != null ? this.$value : ''
        switch(this.type) {
          case 'number': return +val
          default: return val
        }
      },
    })
  }

  keyUp(keyCode) {
    if(keyCode === 13) {
      this.submit()
    }
  }

  clear() {
    this.value = ''
    this.input.value = ''
    this.render()
    this.emit('search:reset')
  }

  valueChange(value) {
    this.value = value
    return false
  }

  onInput(value) {
    if(value === this.$value + '') return
    if(this.type === 'number' && this.max && +value > +this.max) {
      this.value = this.max
    } else {
      this.value = value
    }
  }

  submit() {
    if(!this.value) return
    this.emit('search:submit', {
      search: this.value,
    })
  }
}
