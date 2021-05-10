import React from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'
import { Input } from 'antd'
import BigNumber from 'bignumber.js'

interface Props {
  onChange?: (value: number | null) => void
  value?: number | null | undefined
  allowNegative?: boolean
}

export default function InputPercentage({
  onChange,
  value,
  allowNegative = true,
  ...otherProps
}: Props) {
  const onValueChange = (event: NumberFormatValues) => {
    if (!onChange) {
      return
    }
    const { floatValue } = event
    if (floatValue === undefined) {
      onChange(null)
      return
    }
    const decimal = new BigNumber(floatValue).dividedBy(100).toNumber()
    onChange(decimal)
  }

  const percentageValue =
    value != null ? new BigNumber(value).multipliedBy(100).toNumber() : ''

  return (
    <NumberFormat
      {...otherProps}
      value={percentageValue}
      onValueChange={onValueChange}
      suffix="%"
      customInput={Input}
      allowNegative={allowNegative}
    />
  )
}
