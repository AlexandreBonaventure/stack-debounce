'use strict';

import stackDebounce from './index'

jest.useFakeTimers()
describe('index', () => {
  let debouncer
  beforeEach(() => {
    debouncer = jest.fn((last) => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
    })
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

  test('debouncer should receive last promise as argument', async () => {
    const callback = jest.fn(() => Promise.resolve());
    const debouncedFn = stackDebounce(callback, debouncer)

    debouncedFn()
    await jest.advanceTimersByTime(1000)
    debouncedFn()
    await jest.advanceTimersByTime(1000)

    expect(debouncer.mock.calls[0][0]).toBe(undefined)
    expect(debouncer.mock.calls[1][0] instanceof Promise).toBe(true)
  })
})
