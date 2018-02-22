'use strict';

import stackDebounce from './index'

jest.useFakeTimers()
describe('index', () => {
  let debouncer
  beforeEach(() => {
    debouncer = () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
    }
  })

  test('should call only the last element', async () => {
    const callback = jest.fn();
    const debouncedFn = stackDebounce(callback, debouncer)

    debouncedFn()
    debouncedFn()
    debouncedFn()
    await jest.advanceTimersByTime(1000)

    debouncedFn()
    debouncedFn()
    debouncedFn()
    debouncedFn()
    debouncedFn()
    debouncedFn()
    await jest.advanceTimersByTime(1000)

    expect(callback).toHaveBeenCalledTimes(2)
  })
})
