import BigNumber from 'bignumber.js'
import { EnhancedAssumptions, InputAssumptions } from './types'

const DAYS_PER_YEAR = 365

export function enhanceAssumptions(
  assumptions: InputAssumptions
): EnhancedAssumptions {
  const { ETHStrategyAPY, poolAPY, DRCFee } = assumptions

  const poolInterestPerDay = new BigNumber(poolAPY)
    .dividedBy(DAYS_PER_YEAR)
    .toNumber()

  return {
    ...assumptions,
    compoundInterestPerDay: new BigNumber(ETHStrategyAPY)
      .dividedBy(DAYS_PER_YEAR)
      .toNumber(),
    poolInterestPerDay,
    DRCPoolInterestPerDay: new BigNumber(poolInterestPerDay)
      .multipliedBy(1 - DRCFee)
      .toNumber(),
  }
}
