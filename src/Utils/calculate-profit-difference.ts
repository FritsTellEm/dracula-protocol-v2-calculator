import {
  DRCFarmingStrategyResult,
  TraditionalFarmingStrategyResult,
} from './types'

export function calculateProfitDifference(
  traditionalDailyResult: TraditionalFarmingStrategyResult,
  drcDailyResult: DRCFarmingStrategyResult
) {
  return drcDailyResult.profit < traditionalDailyResult.profit
    ? -1 * Math.abs(traditionalDailyResult.profit - drcDailyResult.profit)
    : Math.abs(traditionalDailyResult.profit - drcDailyResult.profit)
}
