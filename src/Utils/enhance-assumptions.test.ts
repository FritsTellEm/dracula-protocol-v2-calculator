import { enhanceAssumptions } from './enhance-assumptions'
import * as defaultAssumptions from './default-assumptions'

const assumptions = {
  ...defaultAssumptions,
  ETHStrategyAPY: 3.65,
  poolAPY: 7.3,
  DRCFee: 0.15,
}

describe('enhanceAssumptions', () => {
  it('calculates additional assumptions and extends object', () => {
    const actual = enhanceAssumptions(assumptions)
    const expected = {
      ...assumptions,
      compoundInterestPerDay: 0.01,
      poolInterestPerDay: 0.02,
      DRCPoolInterestPerDay: 0.017,
    }

    expect(actual).toEqual(expected)
  })
})
