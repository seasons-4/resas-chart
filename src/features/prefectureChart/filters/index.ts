import { isString } from 'lodash'

import { CHART_LABELS } from '../constants'

import type {
  CompositionDataUnit,
  CompositionPerPref,
  CompositionPerYearLabel,
  CompositionPerYearResponse
} from '../types'

/**
 * ターゲットが有効な人口構成ラベルかどうかをチェック
 *
 * @param target - チェックするターゲット
 * @returns ターゲットが有効なラベル名を満たす文字列であればtrue、そうでなければfalse
 */
export const isCompositionPerYearLabel = (
  target: unknown
): target is CompositionPerYearLabel => {
  if (!isString(target)) return false
  return (CHART_LABELS as Readonly<string[]>).includes(target)
}

/**
 * CompositionPerYearResponse から特定のラベルのCompositionDataUnitの一覧を取得
 *
 * @param {CompositionPerYearResponse} response - 対象の人口構成データ
 * @param {CompositionPerYearLabel} label - 絞り込みたいラベル名
 * @returns {CompositionDataUnit[]} - CompositionDataUnit情報だけに整形されたデータ
 */
const getCompositionDataUnits = (
  { data }: CompositionPerYearResponse,
  label: CompositionPerYearLabel
): CompositionDataUnit[] => {
  return data.find((v) => v.label === label)?.data || []
}

/**
 * 複数の都道府県のグラフ描画のためのデータ整形を行い、
 * Highchartsのオプションのうち描画するデータによって構成する必要があるオプションを返す
 *
 * @param data - 描画したい全ての都道府県の人口構成データ
 * @param chartLabel - 描画したい人口構成ラベル
 * @returns categories, series - x軸のカテゴリと、描画するデータのオプション
 */
export const getChartOptions = (
  data: CompositionPerPref[],
  chartLabel: CompositionPerYearLabel
) => {
  const series: Highcharts.SeriesOptionsType[] = data.map(
    ({ prefName, data }) => {
      return {
        type: 'line',
        name: prefName || 'no name',
        data: getCompositionDataUnits(data, chartLabel).flatMap(({ value }) => [
          value
        ])
      }
    }
  )

  // x軸の年度はどの都道府県のデータでも同じなので、0番目の都道府県のデータから取得する
  const categories =
    data.length === 0
      ? []
      : getCompositionDataUnits(data[0].data, chartLabel).flatMap(
          ({ year }) => [String(year)]
        )

  return {
    categories,
    series
  }
}
