export interface InputAssumptions {
  daysAmount: number
  ETHStrategyAPY: number
  gasTransactionCost: number
  depositTransactionAmount: number
  rewardClaimTransactionAmount: number
  swapAndStakeTransactionAmount: number
  initialPrincipal: number
  poolAPY: number
  rewardClaimIntervalDays: number
  DRCFee: number
}

export interface EnhancedAssumptions extends InputAssumptions {
  compoundInterestPerDay: number
  poolInterestPerDay: number
  DRCPoolInterestPerDay: number
}

export interface DailyResult {
  day: number
  yieldEarned: number
  compoundingETH: number
  ETHInterestEarned: number
  ETHEarnings: number
  gassCost: number
  totalGassCost: number
  profit: number
}

export interface TraditionalFarmingStrategyResult extends DailyResult {
  totalYieldEarned: number
  rewardsToClaim: number
  claimThisDay: boolean
}

export interface DRCFarmingStrategyResult extends DailyResult {}

export interface Result {
  traditional: TraditionalFarmingStrategyResult[]
  drc: DRCFarmingStrategyResult[]
}
