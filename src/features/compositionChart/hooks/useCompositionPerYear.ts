import { isUndefined } from 'lodash'
import useSWR, { useSWRConfig } from 'swr'

import { getCompositionPerYear } from '../api/getCompositionPerYear'

import type { CompositionPerPref } from '../types'
import type { ResasPrefecture } from '@/types'

// キャッシュされるデータは都道府県コードをキー名に以下の型を満たす値でキャッシュされる
type CachedData = {
  data: CompositionPerPref
}

/** 都道府県ごとの人口構成データのキャッシュ格納時のキー名のprefix */
const COMPOSITION_CACHE_KEY_PREFIX = 'composition-' as const

/**
 * 対象の都道府県のリストに対して、年ごとの人口構成データをキャッシュをベースに取得して返すカスタムフック
 *
 * @remarks
 * swrを使用して、キャッシュの有無に応じてデータ取得を行う。
 * キャッシュがある場合はAPIリクエストを発生させず、キャッシュを返す。
 * キャッシュがない場合はAPIからデータを取得し、指定のキー名でキャッシュする。
 * APIから取得中もキャッシュに選択中の都道府県のデータがあればそれが返され、キャッシュに更新があるとフックされ新規のデータが返される。
 *
 * @param prefectures - 人口構成データを取得する都道府県のリスト
 * @returns data, error キャッシュされたコンポジションデータと、フェッチ中に発生したエラーを含むオブジェクト。
 */
export const useCompositionPerYear = (prefectures: ResasPrefecture[]) => {
  const { cache } = useSWRConfig()
  const noCachedPrefectures = prefectures.filter((prefecture) => {
    return ![...cache.keys()].includes(
      `${COMPOSITION_CACHE_KEY_PREFIX}${prefecture.prefCode}`
    )
  })

  const swrKey = (() => {
    switch (noCachedPrefectures.length) {
      case 0:
        return 'empty'
      case 1:
        return `${COMPOSITION_CACHE_KEY_PREFIX}${noCachedPrefectures[0].prefCode}`
      default: {
        const codes = noCachedPrefectures
          .map(({ prefCode }) => prefCode)
          .join(',')
        return `all-${codes}`
      }
    }
  })()

  const {
    data: _data,
    error,
    isLoading
  } = useSWR(swrKey, async () => {
    switch (noCachedPrefectures.length) {
      case 0:
        // 必要な都道府県情報がすべてキャッシュ済みの場合リクエストを発生させない
        return Promise.resolve(undefined)
      case 1: {
        // キャッシュにない都道府県情報が一つだけ必要な場合(新規の都道府県を選択した場合)
        const prefecture = noCachedPrefectures[0]
        const data = await getCompositionPerYear(prefecture.prefCode)
        // NOTE: swrによりswrKey名で以下return値がCachedData型に格納されてキャッシュされる
        return {
          ...prefecture,
          data
        }
      }
      default: {
        // キャッシュにない都道府県情報が一度に複数必要な場合（画面操作からは単体取得しかできないので基本的にはURL操作・リロード時）
        const promises = noCachedPrefectures.map<Promise<CompositionPerPref>>(
          (prefecture) => {
            return getCompositionPerYear(prefecture.prefCode).then((data) => {
              const res = { ...prefecture, data }
              // NOTE: return値ではなく、単体ごとにswrKeyのcase 1と同様のキー名・データ型でキャッシュ
              cache.set(
                `${COMPOSITION_CACHE_KEY_PREFIX}${prefecture.prefCode}`,
                { data: res } satisfies CachedData
              )
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
  const cachedCompositionList = prefectures.flatMap<CompositionPerPref>(
    ({ prefCode }) => {
      const cachedData = cache.get(
        `${COMPOSITION_CACHE_KEY_PREFIX}${prefCode}`
      ) as CachedData | undefined
      if (isUndefined(cachedData)) {
        return []
      }
      return cachedData.data
    }
  )

  return {
    data: cachedCompositionList,
    error,
    isLoading
  }
}
