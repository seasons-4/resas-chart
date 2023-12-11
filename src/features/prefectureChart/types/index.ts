import type { CHART_LABELS } from '../constants'

/**
 * RESAS APIの1都道府県を表す型
 */
export type ResasPrefecture = {
  prefCode: number
  prefName: string
}

/**
 * RESAS APIの人口構成の１データを表す型
 */
export type CompositionDataUnit = {
  year: number
  value: number
}

/**
 * RESAS APIの人口構成の種類を表す型
 */
export type CompositionPerYearLabel = (typeof CHART_LABELS)[number]

/**
 * RESAS APIの人口構成の１種類ごとのデータを表す型
 */
type CompositionPerYearData = {
  label: CompositionPerYearLabel
  data: CompositionDataUnit[]
}

/**
 * RESAS APIの人口構成情報レスポンスデータを表す型
 */
export type CompositionPerYearResponse = {
  boundaryYear: number
  data: CompositionPerYearData[]
}

/**
 * RESAS APIの人口構成の１都道府県ごとのデータを表す型
 */
export type CompositionPerPref = ResasPrefecture & {
  data: CompositionPerYearResponse
}
