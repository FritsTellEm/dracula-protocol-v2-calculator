import numeral from 'numeral'

interface FormatCurrencyOptions {
  decimals?: number
}

export function formatCurrency(
  value: number | string,
  { decimals = 2 }: FormatCurrencyOptions = {}
) {
  const decimalZeros = [...Array(decimals)].map(() => '0').join('')
  const format = `$0[.]${decimalZeros}a`
  return numeral(value).format(format)
}
