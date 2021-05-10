import { Result } from '../../Utils/types'

export default function createDataSource(result: Result) {
  return result.traditional.map((traditionalResult, index) => {
    const drcResult = result.drc[index]
    const profitDifference =
      drcResult.profit < traditionalResult.profit
        ? -1 * Math.abs(traditionalResult.profit - drcResult.profit)
        : Math.abs(traditionalResult.profit - drcResult.profit)
    return {
      day: traditionalResult.day,
      traditionalYieldEarned: traditionalResult.yieldEarned,
      traditionalTotalYieldEarned: traditionalResult.totalYieldEarned,
      traditionalRewardsToClaim: traditionalResult.rewardsToClaim,
      traditionalClaimThisDay: traditionalResult.claimThisDay,
      traditionalCompoundingETH: traditionalResult.compoundingETH,
      traditionalETHInterestEarned: traditionalResult.ETHInterestEarned,
      traditionalETHEarnings: traditionalResult.ETHEarnings,
      traditionalGassCost: traditionalResult.gassCost,
      traditionalTotalGassCost: traditionalResult.totalGassCost,
      traditionalProfit: traditionalResult.profit,
      drcYieldEarned: drcResult.yieldEarned,
      drcCompoundingETH: drcResult.compoundingETH,
      drcETHInterestEarned: drcResult.ETHInterestEarned,
      drcETHEarnings: drcResult.ETHEarnings,
      drcGassCost: drcResult.gassCost,
      drcTotalGassCost: drcResult.totalGassCost,
      drcProfit: drcResult.profit,
      profitDifference,
    }
  })
}
