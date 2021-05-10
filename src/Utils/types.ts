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

export interface TraditionalFarmingStrategyResult {
  day: number
  yieldEarned: number
  totalYieldEarned: number
  rewardsToClaim: number
  claimThisDay: boolean
  compoundingETH: number
  ETHInterestEarned: number
  ETHEarnings: number
  gassCost: number
  totalGassCost: number
  profit: number
}

export interface DRCFarmingStrategyResult {
  day: number
  yieldEarned: number
  compoundingETH: number
  ETHInterestEarned: number
  ETHEarnings: number
  gassCost: number
  totalGassCost: number
  profit: number
}

export interface Result {
  traditional: TraditionalFarmingStrategyResult[]
  drc: DRCFarmingStrategyResult[]
}
