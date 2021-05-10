import { Col, Row } from 'antd'
import React from 'react'
import { formatCurrency } from '../../Utils/formatters'

interface Props {
  active: boolean
  label: string
  payload: any
}

export default function CustomTooltip({ active, payload, label }: Props) {
  if (active && payload && payload.length) {
    const traditionalProfit = payload.find(
      ({ dataKey }: { dataKey: string }) => dataKey === 'traditionalProfit'
    )?.value
    const drcProfit = payload.find(
      ({ dataKey }: { dataKey: string }) => dataKey === 'drcProfit'
    )?.value

    return (
      <div className="line-chart-custom-tooltip">
        <Row gutter={[8, 4]}>
          <Col span={12} style={{ textAlign: 'right' }}>
            Day:
          </Col>
          <Col span={12}>{label}</Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            Traditional Profit:
          </Col>
          <Col span={12}>{formatCurrency(traditionalProfit)}</Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            DRC Profit:
          </Col>
          <Col span={12}>{formatCurrency(drcProfit)}</Col>
        </Row>
      </div>
    )
  }

  return null
}
