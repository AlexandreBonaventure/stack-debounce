export default function stackDebounce (fn, debouncer) {
  let queue = []
  let waiting = false
  const resolver = async () => {
    if (!waiting) {
      waiting = true
      await debouncer()
      waiting = false
      if (queue.length) {
        queue.pop()()
        queue = []
      }
    }
  }
  return (...args) => {
    queue.push(() => fn(...args))
    return resolver()
  }
}
