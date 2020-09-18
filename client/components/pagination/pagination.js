import { Component, Template, Attribute } from '@scoutgg/widgets/esm/index.js'
import template from './pagination.pug'
import { clamp } from '../../lib/utils.js'

@Component('poll')
@Template(template)
@Attribute('current', Number)
@Attribute('last-page', Number)
@Attribute('page-limit', Number)
@Attribute('disabled', Boolean)
export default class Pagination extends HTMLElement {
  changePage(v) {
    if(!v || v > 1) {
      this.current = v
    } else {
      this.current += v
    }
    this.emit('pagination:page-changed', {
      page: this.current,
    })
    this.render()
  }

  nextPage() {
    if(this.current + 1 <= this.lastPage) {
      this.changePage(1)
    }
  }

  prevPage() {
    if(this.current - 1 >= 0) {
      this.changePage(-1)
    }
  }

  firstPage() {
    if(this.current) {
      this.changePage(0)
    }
  }

  finalPage() {
    if(this.current !== this.lastPage) {
      this.changePage(this.lastPage)
    }
  }

  get clamp() {
    return clamp
  }
}
