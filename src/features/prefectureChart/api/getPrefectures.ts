import { isString } from 'lodash'

import type { ResasErrorResponse } from '@/types'

type Prefecture = { prefCode: number; prefName: string }

type ResponseBody = {
  message: null
  result: Prefecture[]
}

/**
 * 都道府県一覧データを取得する関数
 * @returns 都道府県データの配列
 * @throws レスポンスがエラーの場合、またはレスポンスボディが不正な場合にエラーをthrow
 */
export const getPrefectures = async (): Promise<Prefecture[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESAS_API_URL}/prefectures`,
    {
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY
      }
    }
  )

  if (!response.ok) {
    throw response
  }

  const responseBody: ResponseBody | ResasErrorResponse = await response.json()
  if (isString(responseBody) || !('result' in responseBody)) {
    throw responseBody
  }

  return responseBody.result
}
