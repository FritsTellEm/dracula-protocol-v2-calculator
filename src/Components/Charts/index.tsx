import React from 'react'
import { Tabs } from 'antd'
import LineChart from '../LineChart'
import { Result } from '../../Utils/types'

const { TabPane } = Tabs

interface Props {
  result: Result
}

export default function Charts({ result }: Props) {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Line Chart" key="1">
        <LineChart result={result} />
      </TabPane>
      <TabPane tab="Heatmap" key="2">
        Coming soon!
      </TabPane>
    </Tabs>
  )
}
