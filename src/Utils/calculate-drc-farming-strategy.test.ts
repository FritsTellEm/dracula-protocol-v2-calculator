import { calculateDRCFarmingStrategy } from './calculate-drc-farming-strategy'
import { EnhancedAssumptions, DRCFarmingStrategyResult } from './types'

const assumptions: EnhancedAssumptions = {
  daysAmount: 3,
  ETHStrategyAPY: 3.65,
  compoundInterestPerDay: 0.01,
  rewardClaimIntervalDays: 0,
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

describe('calculateDRCFarmingStrategy', () => {
  it('correctly calculates result for 3 day period', () => {
    const actual = calculateDRCFarmingStrategy(assumptions)
    const expected: DRCFarmingStrategyResult[] = [
      {
        day: 1,
        yieldEarned: 17,
        compoundingETH: 17,
        ETHInterestEarned: 0.17,
        ETHEarnings: 17.17,
        gasCost: 50,
        totalGasCost: 50,
        profit: -32.83, // 17.17 - 50
      },
      {
        day: 2,
        yieldEarned: 17,
        compoundingETH: 34.17,
        ETHInterestEarned: 0.3417,
        ETHEarnings: 34.5117,
        gasCost: 0,
        totalGasCost: 50,
        profit: -15.4883, // 34.5117 - 50
      },
      {
        day: 3,
        yieldEarned: 17,
        compoundingETH: 51.5117,
        ETHInterestEarned: 0.515117,
        ETHEarnings: 52.026817,
        gasCost: 0,
        totalGasCost: 50,
        profit: 2.026817, // 52.026817 - 50
      },
    ]

    expect(actual).toEqual(expected)
  })
})
