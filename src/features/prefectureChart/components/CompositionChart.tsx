'use client'

/**
 * 以下issueにてある通りNext.js14.0.2では es-module から import しないとbuildが通らない(2023/12/11時点)
 * https://github.com/vercel/next.js/issues/58379
 * https://github.com/highcharts/highcharts/issues/20129
 */
import Highcharts from 'highcharts/es-modules/masters/highcharts.src'
import HighchartsReact from 'highcharts-react-official'
import { isUndefined } from 'lodash'

import { getChartOptions } from '../filters'

import type { CompositionPerPref, CompositionPerYearLabel } from '../types'

type Props = {
  data: CompositionPerPref[]
  chartLabel: CompositionPerYearLabel
  chartTitle?: string
}

/**
 * 人口構成をグラフ描画するコンポーネント
 *
 * @param data - 描画したい人口構成のデータ
 * @param chartLabel - 描画したい人口構成のラベル名
 * @param chartTitle - タイトルに表示したい文字列(optionalなため親からも指定したい場合のみ代入可能)
 */
export const CompositionChart = ({ data, chartLabel, chartTitle }: Props) => {
  const { series, categories } = getChartOptions(data, chartLabel)

  const titleText = (() => {
    if (!isUndefined(chartTitle)) return chartTitle
    if (data.length === 0) return '都道府県を選択してください'
    return `${chartLabel}推移`
  })()

  const options: Highcharts.Options = {
    /**
     * highcharts/es-modules/masters/highcharts.src から import した場合accessibilityに関するwarningが出る
     * warning内で推奨された通り、accessibilityを無効化する
     */
    accessibility: {
      enabled: false
    },
    chart: {
      spacingTop: 16,
      spacingLeft: 16
    },
    credits: {
      enabled: false
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    title: {
      text: titleText
    },
    xAxis: {
      categories,
      title: {
        text: '西暦(年)',
        style: { fontWeight: 'bold' }
      }
    },
    yAxis: {
      title: {
        text: `${chartLabel}数(人)`,
        style: { fontWeight: 'bold' }
      }
    }
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={{ ...options, series }} />
  )
}
