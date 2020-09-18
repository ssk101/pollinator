export default (() => {
  const script = document.querySelector('script[src="/application.js"]')
  return Object.assign({}, script.dataset)
})()
