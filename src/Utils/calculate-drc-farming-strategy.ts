import { BigNumber } from 'bignumber.js'

import { DRCFarmingStrategyResult, EnhancedAssumptions } from './types'

function calculateFirstDayResult(
  assumptions: EnhancedAssumptions
): DRCFarmingStrategyResult {
  const {
    initialPrincipal,
    DRCPoolInterestPerDay,
    compoundInterestPerDay,
    gasTransactionCost,
    depositTransactionAmount,
    rewardClaimTransactionAmount,
  } = assumptions

  const day = 1

  const yieldEarned = new BigNumber(DRCPoolInterestPerDay)
    .times(initialPrincipal)
    .toNumber()

  const compoundingETH = yieldEarned

  const ETHInterestEarned = new BigNumber(compoundingETH)
    .times(compoundInterestPerDay)
    .toNumber()

  const ETHEarnings = new BigNumber(compoundingETH)
    .plus(ETHInterestEarned)
    .toNumber()

  const gassCost = new BigNumber(gasTransactionCost)
    .times(
      depositTransactionAmount +
        depositTransactionAmount +
        rewardClaimTransactionAmount
    )
    .toNumber()

  const totalGassCost = gassCost

  const profit = new BigNumber(ETHEarnings).minus(totalGassCost).toNumber()

  return {
    day,
    yieldEarned,
    compoundingETH,
    ETHInterestEarned,
    ETHEarnings,
    gassCost,
    totalGassCost,
    profit,
  }
}

export function calculateResult(
  assumptions: EnhancedAssumptions,
  previousDayResult: DRCFarmingStrategyResult
): DRCFarmingStrategyResult {
  const { initialPrincipal, DRCPoolInterestPerDay, compoundInterestPerDay } =
    assumptions

  const day = previousDayResult.day + 1

  const yieldEarned = new BigNumber(DRCPoolInterestPerDay)
    .times(initialPrincipal)
    .toNumber()

  const compoundingETH = new BigNumber(yieldEarned)
    .plus(previousDayResult.ETHEarnings)
    .toNumber()

  const ETHInterestEarned = new BigNumber(compoundingETH)
    .times(compoundInterestPerDay)
    .toNumber()

  const ETHEarnings = new BigNumber(compoundingETH)
    .plus(ETHInterestEarned)
    .toNumber()

  const gassCost = 0

  const totalGassCost = new BigNumber(previousDayResult.totalGassCost)
    .plus(gassCost)
    .toNumber()

  const profit = new BigNumber(ETHEarnings).minus(totalGassCost).toNumber()

  return {
    day,
    yieldEarned,
    compoundingETH,
    ETHInterestEarned,
    ETHEarnings,
    gassCost,
    totalGassCost,
    profit,
  }
}

export function calculateDRCFarmingStrategy(assumptions: EnhancedAssumptions) {
  const results: DRCFarmingStrategyResult[] = []

  for (let i = 0; i < assumptions.daysAmount; i++) {
    const day = i + 1
    const result =
      day === 1
        ? calculateFirstDayResult(assumptions)
        : calculateResult(assumptions, results[i - 1])

    results.push(result)
  }

  return results
}
