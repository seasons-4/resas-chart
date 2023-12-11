import { isString } from 'lodash'

import type { ResasPrefecture } from '../types'
import type { ResasResponse } from '@/types'

/**
 * 都道府県一覧データを取得する関数
 * @returns 都道府県データの配列
 * @throws レスポンスがエラーの場合、またはレスポンスボディが不正な場合にエラーをthrow
 */
export const getPrefectures = async (): Promise<ResasPrefecture[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESAS_API_URL}/prefectures`,
    {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY
      }
    }
  )

  if (!response.ok) {
    throw response
  }

  const responseBody: ResasResponse<ResasPrefecture[]> = await response.json()
  if (isString(responseBody) || !('result' in responseBody)) {
    throw responseBody
  }

  return responseBody.result
}
