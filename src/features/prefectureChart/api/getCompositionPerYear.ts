import { isString } from 'lodash'

import type { CompositionPerYearResponse } from '../types'
import type { ResasResponse } from '@/types'

/**
 * 都道府県ごとの人口構成を取得する
 *
 * @param prefCode 都道府県コード
 * @returns 対象の都道府県の人口構成情報および統計の境界年
 * @throws レスポンスがエラーの場合、またはレスポンスボディが不正な場合にエラーをthrow
 */
export const getCompositionPerYear = async (
  prefCode: string
): Promise<CompositionPerYearResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESAS_API_URL}/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
    {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY
      }
    }
  )

  if (!response.ok) {
    throw response
  }

  const responseBody: ResasResponse<CompositionPerYearResponse> =
    await response.json()
  if (isString(responseBody) || !('result' in responseBody)) {
    throw responseBody
  }

  return responseBody.result
}
