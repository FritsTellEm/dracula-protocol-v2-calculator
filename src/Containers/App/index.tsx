import React, { useState } from 'react'
import { Collapse, Divider } from 'antd'

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

const { Panel } = Collapse

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
        <Panel header="Assumptions" key="1">
          <AssumptionsForm
            assumptions={assumptions}
            onChangeAssumptions={onChangeAssumptions}
          />
        </Panel>
        <Panel header="Data" key="2">
          <DataTable result={result} />
        </Panel>
      </Collapse>

      <Footer />
    </PageWindow>
  )
}

export default App
