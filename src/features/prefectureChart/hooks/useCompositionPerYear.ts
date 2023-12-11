import { isUndefined } from 'lodash'
import useSWR, { useSWRConfig } from 'swr'

import { getCompositionPerYear } from '../api'

import type { CompositionPerPref, CompositionPerYearResponse } from '../types'

// キャッシュされるデータは都道府県コードをキー名に以下の型を満たす値でキャッシュされる
type CachedData = {
  data: {
    prefCode: string
    data: CompositionPerYearResponse
  }
}

/**
 * 対象の都道府県のリストに対して、年ごとの人口構成データをキャッシュをベースに取得して返すカスタムフック
 *
 * @remarks
 * swrを使用して、キャッシュの有無に応じてデータ取得を行う。
 * キャッシュがある場合はAPIリクエストを発生させず、キャッシュを返す。
 * キャッシュがない場合はAPIからデータを取得し、指定のキー名でキャッシュする。
 * APIから取得中もキャッシュに選択中の都道府県のデータがあればそれを返され、キャッシュに更新がそれがフックされ新規のデータが返される。
 *
 * @param prefCodes - 人口構成データを取得する都道府県のリスト
 * @returns data, error キャッシュされたコンポジションデータと、フェッチ中に発生したエラーを含むオブジェクト。
 */
export const useCompositionPerYear = (prefCodes: string[]) => {
  const { cache } = useSWRConfig()
  const noCachedCodes = prefCodes.filter(
    (prefCode) => ![...cache.keys()].includes(prefCode)
  )

  const swrKey = (() => {
    switch (noCachedCodes.length) {
      case 0:
        return 'empty'
      case 1:
        return noCachedCodes[0]
      default:
        return `all-${noCachedCodes.join(',')}`
    }
  })()

  const { data: _data, error } = useSWR(swrKey, async () => {
    switch (noCachedCodes.length) {
      case 0:
        // 必要な都道府県情報がすべてキャッシュ済みの場合リクエストを発生させない
        return Promise.resolve(undefined)
      case 1: {
        // キャッシュにない都道府県情報が一つだけ必要な場合(新規の都道府県を選択した場合)
        const prefCode = noCachedCodes[0]
        const data = await getCompositionPerYear(prefCode)
        // NOTE: swrによりswrKey名で以下return値がCachedData型に格納されてキャッシュされる
        return {
          prefCode,
          data
        }
      }
      default: {
        // キャッシュにない都道府県情報が一度に複数必要な場合（画面操作からは単体取得しかできないので基本的にはURL操作・リロード時）
        const promises = noCachedCodes.map<Promise<CompositionPerPref>>(
          (prefCode) => {
            return getCompositionPerYear(prefCode).then((data) => {
              const res = { prefCode, data }
              // NOTE: return値ではなく、単体ごとにswrKeyのcase 1と同様のキー名・データ型でキャッシュ
              cache.set(prefCode, { data: res } satisfies CachedData)
              return res
            })
          }
        )
        return Promise.all(promises)
      }
    }
  })

  /**
   * 対象の都道府県からキャッシュにあるものだけ返却
   * キャッシュに更新があるとフックされ、新規のデータが返される
   */
  const cachedCompositionList = prefCodes.flatMap<CompositionPerPref>(
    (prefCode) => {
      const cachedData = cache.get(prefCode) as CachedData | undefined
      if (isUndefined(cachedData)) {
        return []
      }
      return cachedData.data
    }
  )

  return {
    data: cachedCompositionList,
    error
  }
}
