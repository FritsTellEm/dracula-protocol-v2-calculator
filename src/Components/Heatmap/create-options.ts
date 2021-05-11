import Highcharts from 'highcharts'

import { EnhancedAssumptions } from '../../Utils/types'
import { DAYS_AMOUNT, REWARD_CLAIM_INTERVALS } from './config'
import { createSeries } from './create-series'
import { formatTooltip, CustomPoint } from './format-tooltip'

const xAxisCategories = DAYS_AMOUNT.map(({ label }) => label)
const yAxisCategories = REWARD_CLAIM_INTERVALS.map(({ label }) => label)

export function createOptions(assumptions: EnhancedAssumptions) {
  const options: Highcharts.Options = {
    chart: {
      type: 'heatmap',
      plotBorderWidth: 1,
    },
    title: {
      text: 'Profit Difference per Reward Claim Interval per Farming Duration',
    },
    xAxis: {
      categories: xAxisCategories,
      title: {
        text: 'Farming Duration',
      },
    },
    yAxis: {
      categories: yAxisCategories,
      title: {
        text: 'Reward Claim Interval',
      },
    },
    // colorAxis: {
    //   minColor: 'darkred',
    //   maxColor: 'darkgreen',
    // },
    // legend: {
    //   align: 'right',
    //   layout: 'vertical',
    //   margin: 0,
    //   verticalAlign: 'top',
    //   y: 35,
    //   symbolHeight: 280,
    // },
    legend: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return formatTooltip(this.point as CustomPoint)
      },
    },
    series: createSeries(assumptions),
  }

  return options
}
