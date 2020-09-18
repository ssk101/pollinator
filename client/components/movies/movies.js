import { Component, Template, Attribute } from '@scoutgg/widgets/esm/index.js'
import template from './movies.pug'
import {
  Imdb,
} from '../../models'
import striptags from 'striptags'
import { score as fuzzyScore } from 'fuzzaldrin'
import '../search/search.js'

@Component('poll')
@Attribute('page-limit', Number)
@Template(template)
export default class Movies extends HTMLElement {
  attached() {

  }

  pageChanged({ page }) {

  }

  async search(q) {

  }
}
