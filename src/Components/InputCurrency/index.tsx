import React from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'
import { Input } from 'antd'

import { DEFAULT_CURRENCY_SYMBOL } from '../../Constants'

interface Props {
  onChange?: (value: number | null) => void
  currencySymbol?: string
  allowNegative?: boolean
}

export default function InputCurrency({
  onChange,
  currencySymbol = DEFAULT_CURRENCY_SYMBOL,
  allowNegative = true,
  ...otherProps
}: Props) {
  const onValueChange = (event: NumberFormatValues) => {
    if (!onChange) {
      return
    }
    const { floatValue } = event
    onChange(floatValue === undefined ? null : floatValue)
  }

  return (
    <NumberFormat
      {...otherProps}
      onValueChange={onValueChange}
      prefix={currencySymbol}
      customInput={Input}
      allowNegative={allowNegative}
      thousandSeparator
    />
  )
}
