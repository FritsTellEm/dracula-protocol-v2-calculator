import { BigNumber } from 'bignumber.js'

import { EnhancedAssumptions, TraditionalFarmingStrategyResult } from './types'

function determineClaimThisDay(day: number, rewardClaimIntervalDays: number) {
  return rewardClaimIntervalDays > 0 && day % rewardClaimIntervalDays === 0
}

function calculateFirstDayResult(
  assumptions: EnhancedAssumptions
): TraditionalFarmingStrategyResult {
  const {
    initialPrincipal,
    poolInterestPerDay,
    rewardClaimIntervalDays,
    compoundInterestPerDay,
    gasTransactionCost,
    depositTransactionAmount,
    rewardClaimTransactionAmount,
    swapAndStakeTransactionAmount,
  } = assumptions

  const day = 1

  const yieldEarned = new BigNumber(poolInterestPerDay)
    .times(initialPrincipal)
    .toNumber()

  const claimThisDay = determineClaimThisDay(day, rewardClaimIntervalDays)

  const compoundingETH = claimThisDay ? yieldEarned : 0

  const ETHInterestEarned = new BigNumber(compoundingETH)
    .times(compoundInterestPerDay)
    .toNumber()

  const ETHEarnings = new BigNumber(compoundingETH)
    .plus(ETHInterestEarned)
    .toNumber()

  const gasCost = claimThisDay
    ? new BigNumber(gasTransactionCost)
        .times(
          depositTransactionAmount +
            rewardClaimTransactionAmount +
            rewardClaimTransactionAmount +
            swapAndStakeTransactionAmount
        )
        .toNumber()
    : new BigNumber(gasTransactionCost)
        .times(depositTransactionAmount + rewardClaimTransactionAmount)
        .toNumber()

  return {
    day,
    yieldEarned: yieldEarned,
    totalYieldEarned: yieldEarned,
    rewardsToClaim: yieldEarned,
    claimThisDay,
    compoundingETH,
    ETHInterestEarned,
    ETHEarnings,
    gasCost,
    totalGasCost: gasCost,
    profit: (claimThisDay ? ETHEarnings : yieldEarned) - gasCost,
  }
}

export function calculateResult(
  assumptions: EnhancedAssumptions,
  previousDayResult: TraditionalFarmingStrategyResult
): TraditionalFarmingStrategyResult {
  const {
    initialPrincipal,
    poolInterestPerDay,
    rewardClaimIntervalDays,
    compoundInterestPerDay,
    gasTransactionCost,
    rewardClaimTransactionAmount,
    swapAndStakeTransactionAmount,
  } = assumptions

  const day = previousDayResult.day + 1

  const yieldEarned = new BigNumber(poolInterestPerDay)
    .times(initialPrincipal)
    .toNumber()

  const totalYieldEarned = new BigNumber(previousDayResult.totalYieldEarned)
    .plus(yieldEarned)
    .toNumber()

  const rewardsToClaim = previousDayResult.claimThisDay
    ? yieldEarned
    : new BigNumber(yieldEarned)
        .plus(previousDayResult.rewardsToClaim)
        .toNumber()

  const claimThisDay = determineClaimThisDay(day, rewardClaimIntervalDays)

  const compoundingETH = claimThisDay
    ? new BigNumber(rewardsToClaim)
        .plus(previousDayResult.ETHEarnings)
        .toNumber()
    : previousDayResult.ETHEarnings

  const ETHInterestEarned = new BigNumber(compoundingETH)
    .times(compoundInterestPerDay)
    .toNumber()

  const ETHEarnings = new BigNumber(compoundingETH)
    .plus(ETHInterestEarned)
    .toNumber()

  const gasCost = claimThisDay
    ? new BigNumber(gasTransactionCost)
        .times(rewardClaimTransactionAmount + swapAndStakeTransactionAmount)
        .toNumber()
    : 0

  const totalGasCost = gasCost + previousDayResult.totalGasCost

  const earnings = claimThisDay
    ? ETHEarnings
    : new BigNumber(rewardsToClaim).plus(ETHEarnings).toNumber()

  const profit = new BigNumber(earnings).minus(totalGasCost).toNumber()

  return {
    day,
    yieldEarned,
    totalYieldEarned,
    rewardsToClaim,
    claimThisDay,
    compoundingETH,
    ETHInterestEarned,
    ETHEarnings,
    gasCost,
    totalGasCost,
    profit,
  }
}

export function calculateTraditionalFarmingStrategy(
  assumptions: EnhancedAssumptions
) {
  const results: TraditionalFarmingStrategyResult[] = []

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
