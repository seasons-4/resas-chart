'use client'

import { isUndefined } from 'lodash'
import { useSearchParams } from 'next/navigation'

import { PREFECTURE_QUERY_KEY } from '@/features/prefectures'

import { Chart } from './Chart'
import { LABEL_QUERY_KEY } from '../constants'
import { isCompositionPerYearLabel } from '../filters'
import { useCompositionPerYear } from '../hooks/useCompositionPerYear'

import type { ResasPrefecture } from '@/types'

type Props = {
  prefBaseData: ResasPrefecture[]
}

/**
 * CompositionChart.tsxのコンテナコンポーネント
 *
 * @remarks
 * URLクエリパラメーターから都道府県コードとラベルを取得し、対象の人口構成データを取得する。
 * 取得したデータ（および取得状態に応じたデータ）をCompositionChart.tsxに渡す。
 *
 * @param prefBaseData -  都道府県一覧のマスターデータ
 */
export const ChartContainer = ({ prefBaseData }: Props) => {
  const searchParams = useSearchParams()
  const prefCodes = searchParams
    .getAll(PREFECTURE_QUERY_KEY)
    .filter((code) => Number(code) > 0)

  const { data, isLoading, error } = useCompositionPerYear(
    prefBaseData.filter(({ prefCode }) => prefCodes.includes(String(prefCode)))
  )

  const chartLabel = searchParams.get(LABEL_QUERY_KEY) || '総人口'

  if (!isCompositionPerYearLabel(chartLabel) || !isUndefined(error)) {
    return (
      <Chart
        chartLabel={'総人口'}
        data={[]}
        chartTitle="データ取得に失敗しました<br />時間をおいて再度お試しください"
      />
    )
  }

  const chartTitle =
    prefCodes.length > 0 && data.length === 0 && isLoading
      ? 'データ取得中'
      : undefined

  return <Chart chartLabel={chartLabel} data={data} chartTitle={chartTitle} />
}
