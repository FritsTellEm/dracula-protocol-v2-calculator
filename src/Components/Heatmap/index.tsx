import React, { memo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsHeatmap from 'highcharts/modules/heatmap'

import { EnhancedAssumptions } from '../../Utils/types'
import { createOptions } from './create-options'

import './index.less'

window.Highcharts = Highcharts
HighchartsHeatmap(Highcharts)

interface Props {
  assumptions: EnhancedAssumptions
}

function Heatmap({ assumptions }: Props) {
  const options = createOptions(assumptions)
  return (
    <div className="heatmap">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default memo(Heatmap)
