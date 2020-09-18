import Movies from '../components/movies/movies.js'

const viewPort = document.body.querySelector('poll-viewport')

const routes = [
  { path: 'movies', component: Movies },
]

const parseLocation = () => {
  console.log(location.pathname.slice(1).toLowerCase() || '/')
  return location.pathname.slice(1).toLowerCase() || '/'
}

const findComponentByPath = (path, routes) => {
  return routes.find(r => r.path === path)
}

const router = () => {
  const path = parseLocation()
  const { component } = findComponentByPath(path, routes) || {}

  if(!component) return

  viewPort.innerHTML = ''
  component.setAttribute('slot', 'viewport')
  viewPort.appendChild(component)
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)
