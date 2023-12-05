const average = require('../utils/list_helper').average

describe('average', () => {
  test('of one value is the the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1,2,3,4,5,6])).toBe(3.5)
  })

  test('of an empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})