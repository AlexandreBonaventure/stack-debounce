export default function stackDebounce (fn, debouncer) {
  let queue = []
  let lastPromise
  let waiting = false
  const resolver = async () => {
    if (!waiting) {
      waiting = true
      await debouncer(lastPromise)
      waiting = false
      if (queue.length) {
        lastPromise = queue.pop()()
        queue = []
      }
    }
  }
  return (...args) => {
    queue.push(() => fn(...args))
    return resolver()
  }
}
