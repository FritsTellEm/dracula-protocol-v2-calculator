import { formatCurrency } from './formatters'

describe('formatCurrency', () => {
  it('formats numeric value into currency string', () => {
    const actual = formatCurrency(10.303)
    const expected = '$10.30'

    expect(actual).toEqual(expected)
  })

  it('allows passing decimals', () => {
    const actual = formatCurrency(10.303, { decimals: 0 })
    const expected = '$10'

    expect(actual).toEqual(expected)
  })

  it('handles large values', () => {
    const actual = formatCurrency(1000000000)
    const expected = '$1b'

    expect(actual).toEqual(expected)
  })
})
