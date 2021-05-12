import Highcharts from 'highcharts'
import { calculateProfitDifference } from '../../Utils/calculate-profit-difference'
import calculateStrategies from '../../Utils/calculate-strategies'
import { formatCurrency } from '../../Utils/formatters'
import { EnhancedAssumptions, Result } from '../../Utils/types'
import {
  DAYS_AMOUNT,
  MAX_COLOR,
  MIN_COLOR,
  REWARD_CLAIM_INTERVALS,
} from './config'

const buildModifyAssumptions =
  (assumptions: EnhancedAssumptions, daysAmount: number) =>
  (rewardClaimIntervalDays: number): EnhancedAssumptions => ({
    ...assumptions,
    daysAmount,
    rewardClaimIntervalDays,
  })

function calculateAttributes(day: number, strategyResults: Result) {
  const dailyResultTraditional = strategyResults.traditional[day - 1]
  const dailyResultDRC = strategyResults.drc[day - 1]
  const profitDifference = calculateProfitDifference(
    dailyResultTraditional,
    dailyResultDRC
  )

  return {
    color: profitDifference < 0 ? MIN_COLOR : MAX_COLOR,
    value: profitDifference,
    custom: {
      profitDifference,
      profitTraditional: dailyResultTraditional.profit,
      profitDRC: dailyResultDRC.profit,
    },
  }
}

export function createData(assumptions: EnhancedAssumptions) {
  const data: Highcharts.PointOptionsObject[] = []

  const daysAmount = DAYS_AMOUNT[DAYS_AMOUNT.length - 1].value
  const modifyAssumptions = buildModifyAssumptions(assumptions, daysAmount)

  REWARD_CLAIM_INTERVALS.forEach((rewardClaimIntervalConfig, y) => {
    const modifiedAssumptions = modifyAssumptions(
      rewardClaimIntervalConfig.value
    )
    const strategyResults = calculateStrategies(modifiedAssumptions)

    DAYS_AMOUNT.forEach((daysAmountConfig, x) => {
      data.push({
        x,
        y,
        ...calculateAttributes(daysAmountConfig.value, strategyResults),
      })
    })
  })

  return data
}

export function createSeries(
  assumptions: EnhancedAssumptions
): Highcharts.SeriesOptionsType[] {
  return [
    {
      name: 'Profit Difference',
      type: 'heatmap',
      borderWidth: 1,
      data: createData(assumptions),
      dataLabels: {
        formatter: function () {
          const { value } = this.point
          if (value == null) {
            return
          }
          return formatCurrency(value)
        },
        enabled: true,
        color: 'lightgrey',
      },
    },
  ]
}
