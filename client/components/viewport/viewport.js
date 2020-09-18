import { Component, Template, Attribute } from '@scoutgg/widgets/esm/index.js'
import emitter from '../../services/emitter.js'
import template from './viewport.pug'
import '../movies/movies.js'

@Component('poll')
@Template(template)
export default class Viewport extends HTMLElement {
  async attached() {

  }
}
