import React, { useState } from 'react'
import { Collapse, Divider, Typography } from 'antd'

import * as defaultAssumptions from '../../Utils/default-assumptions'
import { enhanceAssumptions } from '../../Utils/enhance-assumptions'
import DataTable from '../../Components/DataTable'
import PageWindow from '../../Components/PageWindow'
import Header from '../../Components/Header'
import Charts from '../../Components/Charts'
import AssumptionsForm from '../../Components/AssumptionsForm'
import { InputAssumptions } from '../../Utils/types'
import calculateStrategies from '../../Utils/calculate-strategies'
import Footer from '../../Components/Footer'
import Considerations from '../../Components/Considerations'

const { Panel } = Collapse
const { Text } = Typography

function App() {
  const [assumptions, setAssumptions] = useState(
    enhanceAssumptions(defaultAssumptions)
  )

  const onChangeAssumptions = (formAssumptions: InputAssumptions) => {
    const enhancedAssumptions = enhanceAssumptions(formAssumptions)
    setAssumptions(enhancedAssumptions)
  }
  const result = calculateStrategies(assumptions)

  return (
    <PageWindow>
      <Header />

      <Charts assumptions={assumptions} result={result} />

      <Divider />

      <Collapse defaultActiveKey={['1']}>
        <Panel header={<Text strong>Assumptions</Text>} key="1">
          <AssumptionsForm
            assumptions={assumptions}
            onChangeAssumptions={onChangeAssumptions}
          />
        </Panel>
        <Panel header={<Text strong>Data</Text>} key="2">
          <DataTable result={result} />
        </Panel>
        <Panel header={<Text strong>Considerations</Text>} key="3">
          <Considerations />
        </Panel>
      </Collapse>

      <Footer />
    </PageWindow>
  )
}

export default App
