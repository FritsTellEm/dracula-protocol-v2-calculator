import { Result } from '../../Utils/types'

export function createData(result: Result) {
  return [
    {
      day: 0,
      traditionalProfit: 0,
      drcProfit: 0,
    },
    ...result.traditional.map(({ day, profit }, index) => ({
      day,
      traditionalProfit: profit,
      drcProfit: result.drc[index].profit,
    })),
  ]
}
