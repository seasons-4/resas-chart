import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { PREFECTURE_QUERY_KEY } from '../constants'

/**
 * prefectureクエリパラメーターを管理するためのカスタムフックです。
 *
 * @returns [currentParams, updateParams] - 現在のクエリパラメーターと、クエリパラメーターを更新する関数
 */
export const usePrefectureQuery = () => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const currentParams = searchParams.getAll(PREFECTURE_QUERY_KEY)

  const updateParams = useCallback(
    (targetValue: number[]) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      // クエリパラメーターの順番をprefCodeの昇順にする
      const newPrefCodes = [...targetValue].sort((a, b) => a - b)
      newSearchParams.delete(PREFECTURE_QUERY_KEY)
      newPrefCodes.forEach((prefCode) =>
        newSearchParams.append(PREFECTURE_QUERY_KEY, String(prefCode))
      )

      // クエリパラメーターが1つもない場合はrouter.pushが吸収してくれるため`?`がつかない
      router.push(`${pathName}?${newSearchParams.toString()}`)
    },
    [pathName, searchParams, router]
  )

  return [currentParams, updateParams] as const
}
