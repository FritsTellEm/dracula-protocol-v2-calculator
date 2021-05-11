import React from 'react'
import { Tabs } from 'antd'
import LineChart from '../LineChart'
import { EnhancedAssumptions, Result } from '../../Utils/types'
import Heatmap from '../Heatmap'

const { TabPane } = Tabs

interface Props {
  assumptions: EnhancedAssumptions
  result: Result
}

export default function Charts({ assumptions, result }: Props) {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Line Chart" key="1">
        <LineChart result={result} />
      </TabPane>
      <TabPane tab="Heatmap" key="2">
        <Heatmap assumptions={assumptions} />
      </TabPane>
    </Tabs>
  )
}
