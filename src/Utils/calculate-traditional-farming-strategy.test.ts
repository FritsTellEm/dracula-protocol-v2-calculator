import { calculateTraditionalFarmingStrategy } from './calculate-traditional-farming-strategy'
import { EnhancedAssumptions, TraditionalFarmingStrategyResult } from './types'

const sharedAssumptions = {
  daysAmount: 3,
  ETHStrategyAPY: 3.65,
  compoundInterestPerDay: 0.01,
  gasTransactionCost: 10,
  depositTransactionAmount: 2,
  rewardClaimTransactionAmount: 1,
  swapAndStakeTransactionAmount: 2,
  initialPrincipal: 1000,
  poolAPY: 7.3,
  poolInterestPerDay: 0.02,
  DRCFee: 0.15,
  DRCPoolInterestPerDay: 0.02 * 0.85,
}

describe('calculateTraditionalFarmingStrategy', () => {
  it('correctly calculates result for 3 day period without reward claims', () => {
    const assumptions: EnhancedAssumptions = {
      ...sharedAssumptions,
      rewardClaimIntervalDays: 0,
    }

    const actual = calculateTraditionalFarmingStrategy(assumptions)
    const expected: TraditionalFarmingStrategyResult[] = [
      {
        day: 1,
        yieldEarned: 20,
        totalYieldEarned: 20,
        rewardsToClaim: 20,
        claimThisDay: false,
        compoundingETH: 0,
        ETHInterestEarned: 0,
        ETHEarnings: 0,
        gassCost: 30,
        totalGassCost: 30,
        profit: -10,
      },
      {
        day: 2,
        yieldEarned: 20,
        totalYieldEarned: 40,
        rewardsToClaim: 40,
        claimThisDay: false,
        compoundingETH: 0,
        ETHInterestEarned: 0,
        ETHEarnings: 0,
        gassCost: 0,
        totalGassCost: 30,
        profit: 10,
      },
      {
        day: 3,
        yieldEarned: 20,
        totalYieldEarned: 60,
        rewardsToClaim: 60,
        claimThisDay: false,
        compoundingETH: 0,
        ETHInterestEarned: 0,
        ETHEarnings: 0,
        gassCost: 0,
        totalGassCost: 30,
        profit: 30,
      },
    ]

    expect(actual).toEqual(expected)
  })

  it('correctly calculates result for 3 day period with daily reward claim', () => {
    const assumptions: EnhancedAssumptions = {
      ...sharedAssumptions,
      rewardClaimIntervalDays: 1,
    }

    const actual = calculateTraditionalFarmingStrategy(assumptions)
    const expected: TraditionalFarmingStrategyResult[] = [
      {
        day: 1,
        yieldEarned: 20,
        totalYieldEarned: 20,
        rewardsToClaim: 20,
        claimThisDay: true,
        compoundingETH: 20,
        ETHInterestEarned: 0.2,
        ETHEarnings: 20.2,
        gassCost: 60,
        totalGassCost: 60,
        profit: -39.8, // 20.2 - 60
      },
      {
        day: 2,
        yieldEarned: 20,
        totalYieldEarned: 40,
        rewardsToClaim: 20,
        claimThisDay: true,
        compoundingETH: 40.2,
        ETHInterestEarned: 0.402,
        ETHEarnings: 40.602,
        gassCost: 30,
        totalGassCost: 90,
        profit: -49.398, // 40.602 - 90
      },
      {
        day: 3,
        yieldEarned: 20,
        totalYieldEarned: 60,
        rewardsToClaim: 20,
        claimThisDay: true,
        compoundingETH: 60.602,
        ETHInterestEarned: 0.60602,
        ETHEarnings: 61.20802,
        gassCost: 30,
        totalGassCost: 120,
        profit: -58.79198, // 61.20802 - 120
      },
    ]

    expect(actual).toEqual(expected)
  })

  it('correctly calculates result for 3 day period with once per 2 day reward claim', () => {
    const assumptions: EnhancedAssumptions = {
      ...sharedAssumptions,
      rewardClaimIntervalDays: 2,
    }

    const actual = calculateTraditionalFarmingStrategy(assumptions)
    const expected: TraditionalFarmingStrategyResult[] = [
      {
        day: 1,
        yieldEarned: 20,
        totalYieldEarned: 20,
        rewardsToClaim: 20,
        claimThisDay: false,
        compoundingETH: 0,
        ETHInterestEarned: 0,
        ETHEarnings: 0,
        gassCost: 30,
        totalGassCost: 30,
        profit: -10, // 20 - 30
      },
      {
        day: 2,
        yieldEarned: 20,
        totalYieldEarned: 40,
        rewardsToClaim: 40,
        claimThisDay: true,
        compoundingETH: 40,
        ETHInterestEarned: 0.4,
        ETHEarnings: 40.4,
        gassCost: 30,
        totalGassCost: 60,
        profit: -19.6, // 40.4 - 60
      },
      {
        day: 3,
        yieldEarned: 20,
        totalYieldEarned: 60,
        rewardsToClaim: 20,
        claimThisDay: false,
        compoundingETH: 40.4,
        ETHInterestEarned: 0.404,
        ETHEarnings: 40.804,
        gassCost: 0,
        totalGassCost: 60,
        profit: 0.804, // (40.804 + 20) - 60
      },
    ]

    expect(actual).toEqual(expected)
  })
})
