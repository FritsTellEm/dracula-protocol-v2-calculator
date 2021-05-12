import { calculateProfitDifference } from '../../Utils/calculate-profit-difference'
import { Result } from '../../Utils/types'

export default function createDataSource(result: Result) {
  return result.traditional.map((traditionalResult, index) => {
    const drcResult = result.drc[index]
    const profitDifference = calculateProfitDifference(
      traditionalResult,
      drcResult
    )
    return {
      day: traditionalResult.day,
      traditionalYieldEarned: traditionalResult.yieldEarned,
      traditionalTotalYieldEarned: traditionalResult.totalYieldEarned,
      traditionalRewardsToClaim: traditionalResult.rewardsToClaim,
      traditionalClaimThisDay: traditionalResult.claimThisDay,
      traditionalCompoundingETH: traditionalResult.compoundingETH,
      traditionalETHInterestEarned: traditionalResult.ETHInterestEarned,
      traditionalETHEarnings: traditionalResult.ETHEarnings,
      traditionalGasCost: traditionalResult.gasCost,
      traditionalTotalGasCost: traditionalResult.totalGasCost,
      traditionalProfit: traditionalResult.profit,
      drcYieldEarned: drcResult.yieldEarned,
      drcCompoundingETH: drcResult.compoundingETH,
      drcETHInterestEarned: drcResult.ETHInterestEarned,
      drcETHEarnings: drcResult.ETHEarnings,
      drcGasCost: drcResult.gasCost,
      drcTotalGasCost: drcResult.totalGasCost,
      drcProfit: drcResult.profit,
      profitDifference,
    }
  })
}
