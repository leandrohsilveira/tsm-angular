import { formatText } from './string'

describe('formatText function', () => {
  it('should replace placeholders with values', () => {
    const text = 'Hello, {name}!'
    const params = { name: 'John' }
    const result = formatText(text, params)
    expect(result).toBe('Hello, John!')
  })
})
