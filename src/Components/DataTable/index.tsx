import React, { memo } from 'react'

import createDataSource from './create-data-source'
import { Result } from '../../Utils/types'

import { formatCurrency } from '../../Utils/formatters'
import { Table } from 'antd'
import { Text } from 'recharts'
import { DRACULA_RED, LIME } from '../../Styling/colors'

const DEFAULT_WIDTH = 150

interface Props {
  result: Result
}

function DataTable({ result }: Props) {
  const dataSource = createDataSource(result)
  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      width: 75,
      fixed: true,
      sorter: (a: typeof dataSource[0], b: typeof dataSource[0]) =>
        a.day - b.day,
    },
    {
      key: 'traditional',
      title: (
        <Text
          style={{
            fontWeight: 'bold',
            color: LIME,
          }}
        >
          Traditional Farming Strategy
        </Text>
      ),
      children: [
        {
          title: 'Yield Earned',
          dataIndex: 'traditionalYieldEarned',
          key: 'traditionalYieldEarned',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
        {
          title: 'Total Yield Earned',
          dataIndex: 'traditionalTotalYieldEarned',
          key: 'traditionalTotalYieldEarned',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
        {
          title: 'Rewards To Claim',
          dataIndex: 'traditionalRewardsToClaim',
          key: 'traditionalRewardsToClaim',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
        {
          title: 'Claim This Day',
          dataIndex: 'traditionalClaimThisDay',
          key: 'traditionalClaimThisDay',
          width: DEFAULT_WIDTH,
          render: (value: boolean) => (value ? 'Yes' : 'No'),
        },
        {
          title: 'Compounding ETH',
          dataIndex: 'traditionalCompoundingETH',
          key: 'traditionalCompoundingETH',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value, { decimals: 4 }),
        },
        {
          title: 'ETH Interest Earned',
          dataIndex: 'traditionalETHInterestEarned',
          key: 'traditionalETHInterestEarned',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value, { decimals: 4 }),
        },
        {
          title: 'ETH Earnings',
          dataIndex: 'traditionalETHEarnings',
          key: 'traditionalETHEarnings',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value, { decimals: 4 }),
        },
        {
          title: 'Gas Cost',
          dataIndex: 'traditionalGasCost',
          key: 'traditionalGasCost',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
        {
          title: 'Total Gas Cost',
          dataIndex: 'traditionalTotalGasCost',
          key: 'traditionalTotalGasCost',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
        {
          title: 'Profit',
          dataIndex: 'traditionalProfit',
          key: 'traditionalProfit',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
      ],
    },
    {
      key: 'drc',
      title: (
        <Text
          style={{
            fontWeight: 'bold',
            color: DRACULA_RED,
          }}
        >
          Dracula Protocol Farming Strategy
        </Text>
      ),
      children: [
        {
          title: 'Yield Earned',
          dataIndex: 'drcYieldEarned',
          key: 'drcYieldEarned',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
        {
          title: 'Compounding ETH',
          dataIndex: 'drcCompoundingETH',
          key: 'drcCompoundingETH',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value, { decimals: 4 }),
        },
        {
          title: 'ETH Interest Earned',
          dataIndex: 'drcETHInterestEarned',
          key: 'drcETHInterestEarned',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value, { decimals: 4 }),
        },
        {
          title: 'ETH Earnings',
          dataIndex: 'drcETHEarnings',
          key: 'drcETHEarnings',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value, { decimals: 4 }),
        },
        {
          title: 'Gas Cost',
          dataIndex: 'drcGasCost',
          key: 'drcGasCost',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
        {
          title: 'Total Gas Cost',
          dataIndex: 'drcTotalGasCost',
          key: 'drcTotalGasCost',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
        {
          title: 'Profit',
          dataIndex: 'drcProfit',
          key: 'drcProfit',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
      ],
    },
    {
      key: 'comparison',
      title: (
        <Text
          style={{
            fontWeight: 'bold',
          }}
        >
          Comparison
        </Text>
      ),
      children: [
        {
          title: 'Profit Difference',
          dataIndex: 'profitDifference',
          key: 'profitDifference',
          width: DEFAULT_WIDTH,
          render: (value: string) => formatCurrency(value),
        },
      ],
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: '100%',
        y: 300,
      }}
      pagination={{
        defaultPageSize: 365,
      }}
    />
  )
}

export default memo(DataTable)
