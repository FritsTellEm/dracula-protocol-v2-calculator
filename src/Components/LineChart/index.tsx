import React, { memo } from 'react'
import {
  ResponsiveContainer,
  LineChart as LineChartComponent,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import { DRACULA_RED, LIME } from '../../Styling/colors'
import { formatCurrency } from '../../Utils/formatters'
import { Result } from '../../Utils/types'
import { createData } from './create-data'
import CustomTooltip from './CustomTooltip'

import './index.less'

interface Props {
  result: Result
}

function LineChart({ result }: Props) {
  const data = createData(result)

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChartComponent className="line-chart" data={data}>
        <Line
          dataKey="traditionalProfit"
          type="monotone"
          stroke={LIME}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="drcProfit"
          stroke={DRACULA_RED}
          dot={false}
        />
        <XAxis
          dataKey="day"
          height={50}
          minTickGap={25}
          label={{
            value: 'Days',
            position: 'insideBottom',
          }}
        />
        <YAxis
          width={100}
          label={{
            value: 'Profit',
            angle: -90,
            position: 'insideLeft',
          }}
          tickFormatter={(val) => formatCurrency(val, { decimals: 2 })}
        ></YAxis>
        <Tooltip content={(props: any) => <CustomTooltip {...props} />} />
        <Legend
          verticalAlign="top"
          height={36}
          formatter={(val) =>
            val === 'traditionalProfit'
              ? 'Traditional Farming Profit'
              : 'Dracula Protocol Profit'
          }
        />
      </LineChartComponent>
    </ResponsiveContainer>
  )
}

export default memo(LineChart)
