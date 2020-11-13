export default {
  setItem(name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  getItem(name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },
  removeItem(name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }
}