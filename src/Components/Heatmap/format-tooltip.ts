import Highcharts from 'highcharts'
import { formatCurrency } from '../../Utils/formatters'
import { DAYS_AMOUNT, REWARD_CLAIM_INTERVALS } from './config'

export interface CustomPoint extends Highcharts.Point {
  y: number
  custom: {
    profitTraditional: number
    profitDRC: number
    profitDifference: number
  }
}

export function formatTooltip(point: CustomPoint) {
  const {
    x,
    y,
    custom: { profitTraditional, profitDRC, profitDifference },
  } = point

  const daysAmountConfig = DAYS_AMOUNT[x]
  const rewardClaimConfig = REWARD_CLAIM_INTERVALS[y]

  return (
    `<b>Profit difference</b>: ${formatCurrency(profitDifference)}` +
    `<br/>Farming duration: ${daysAmountConfig.label}` +
    `<br/><br/><b>Traditional Farming</b>` +
    `<br/>Reward Claim Interval: ${rewardClaimConfig.label}` +
    `<br/>Profit: ${formatCurrency(profitTraditional)}` +
    `<br/><br/><b>Dracula Protocol</b>` +
    `<br/>Profit: ${formatCurrency(profitDRC)}`
  )
}
