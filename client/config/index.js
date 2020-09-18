const script = document.querySelector('script[src="/application.js"]')
const {
  root,
  ws,
  wsPort,
} = script.dataset

export default {
  root,
  ws,
  wsPort,
  fallbackValue: '-',
  dateFormat: 'YYYY/MM/DD HH:mm:ss',
  pageLimit: 15,
}
