import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

/**
 * prefectureクエリパラメーターを管理するためのカスタムフックです。
 *
 * @returns [currentParams, updateParams] - 現在のクエリパラメーターと、クエリパラメーターを更新する関数
 */
export const usePrefectureQuery = () => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const currentParams = searchParams.getAll('prefecture')

  const updateParams = useCallback(
    (targetValue: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      if (currentParams.includes(targetValue)) {
        newSearchParams.delete('prefecture', targetValue)
      } else {
        newSearchParams.append('prefecture', targetValue)
      }

      // 不正な値を排除し、クエリパラメーターの順番をprefCodeの昇順にする
      const newPrefCodes = newSearchParams
        .getAll('prefecture')
        .filter((code) => Number(code) > 0)
        .sort((a, b) => Number(a) - Number(b))
      newSearchParams.delete('prefecture')
      newPrefCodes.forEach((prefCode) =>
        newSearchParams.append('prefecture', prefCode)
      )

      // クエリパラメーターが1つもない場合はrouter.pushが吸収してくれるため`?`がつかない
      router.push(`${pathName}?${newSearchParams.toString()}`)
    },
    [currentParams, pathName, router, searchParams]
  )

  return [currentParams, updateParams] as const
}
