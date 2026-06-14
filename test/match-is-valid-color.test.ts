import { matchIsValidColor } from '../src/index'

describe('utils/matchIsValidColor', () => {
  test('returns true for a valid hex color', () => {
    expect(matchIsValidColor('#ff0000')).toBe(true)
  })

  test('returns true for a shorthand hex color', () => {
    expect(matchIsValidColor('#fff')).toBe(true)
  })

  test('returns true for an rgb string', () => {
    expect(matchIsValidColor('rgb(255, 0, 0)')).toBe(true)
  })

  test('returns true for a named color', () => {
    expect(matchIsValidColor('red')).toBe(true)
  })

  test('returns false for an invalid string', () => {
    expect(matchIsValidColor('not-a-color')).toBe(false)
  })

  test('returns false for an empty string', () => {
    expect(matchIsValidColor('')).toBe(false)
  })
})
