import page from 'page'

page('/', (context) => {
  // movies
  return import('../components/movies/movies.js')
})
