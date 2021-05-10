import { calculateDRCFarmingStrategy } from './calculate-drc-farming-strategy'
import { calculateTraditionalFarmingStrategy } from './calculate-traditional-farming-strategy'
import { EnhancedAssumptions, Result } from './types'

export default function calculateStrategies(
  assumptions: EnhancedAssumptions
): Result {
  return {
    traditional: calculateTraditionalFarmingStrategy(assumptions),
    drc: calculateDRCFarmingStrategy(assumptions),
  }
}
