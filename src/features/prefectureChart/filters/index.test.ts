import { CHART_LABELS } from '../constants'
import { COMPOSITION_PER_PREF_LIST } from '../test/mock'

import { getChartOptions, isCompositionPerYearLabel } from '.'

describe('getChartOptions', () => {
  it('dataが存在する場合', () => {
    const target = getChartOptions(COMPOSITION_PER_PREF_LIST, '総人口')
    expect(target.categories).toStrictEqual([
      '1990',
      '2000',
      '2010',
      '2020',
      '2030',
      '2040'
    ])
  })

  it('dataが存在しない場合', () => {
    const target = getChartOptions([], '総人口')
    expect(target.categories).toStrictEqual([])
  })
})

describe('isCompositionPerYearLabel', () => {
  expect(isCompositionPerYearLabel('test')).toBeFalsy()
  test.each(CHART_LABELS)('', (name) => {
    expect(isCompositionPerYearLabel(name)).toBeTruthy()
  })
})
