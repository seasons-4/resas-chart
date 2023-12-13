import { renderHook } from '@testing-library/react'
import useSWR, { useSWRConfig } from 'swr'

import { useCompositionPerYear } from './useCompositionPerYear'
import { getCompositionPerYear } from '../api/getCompositionPerYear'
import { COMPOSITION_PER_PREF_LIST } from '../test/mock'

import type { CompositionPerPref } from '../types'

type CachedData = {
  data: CompositionPerPref
}
const prefectures = [
  {
    prefCode: COMPOSITION_PER_PREF_LIST[0].prefCode,
    prefName: COMPOSITION_PER_PREF_LIST[0].prefName
  },
  {
    prefCode: COMPOSITION_PER_PREF_LIST[1].prefCode,
    prefName: COMPOSITION_PER_PREF_LIST[1].prefName
  }
]

jest.mock('../api/getCompositionPerYear')

jest.mock('swr')
function mockingUseSwr<T>(returnData?: T) {
  ;(useSWR as jest.Mock).mockImplementation(
    (_key: string, fn: (...data: unknown[]) => Promise<{ data: T }>) => {
      fn()
      return { data: returnData }
    }
  )
}

function mockingSwrConfig(
  cachedKeys: string[] = [],
  cachedData: CompositionPerPref[] = []
) {
  const cacheMock = {
    keys: jest.fn().mockReturnValue(cachedKeys),
    set: jest.fn<void, [string, CachedData]>(),
    get: jest.fn<{ data: CompositionPerPref }, [string]>()
  }
  cachedData.forEach((data) => cacheMock.get.mockReturnValueOnce({ data }))

  const useSWRConfigMock = {
    cache: cacheMock
  }
  ;(useSWRConfig as jest.Mock).mockImplementationOnce(() => useSWRConfigMock)

  return { cacheMock }
}

describe('useCompositionPerYear', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('取得したいデータが全てキャッシュにある場合APIリクエストメソッドが呼ばれない', () => {
    mockingUseSwr([])
    mockingSwrConfig(
      ['composition-1', 'composition-13'],
      COMPOSITION_PER_PREF_LIST
    )

    renderHook(() => useCompositionPerYear(prefectures))

    expect((useSWR as jest.Mock).mock.calls[0][0]).toBe('empty')
    expect(getCompositionPerYear).not.toHaveBeenCalled()
  })

  it('取得したいデータのうち1件がキャッシュにない場合', () => {
    mockingUseSwr([])
    mockingSwrConfig(['composition-1'], COMPOSITION_PER_PREF_LIST)
    renderHook(() => useCompositionPerYear([COMPOSITION_PER_PREF_LIST[1]]))

    expect((useSWR as jest.Mock).mock.calls[0][0]).toBe('composition-13')
    expect(getCompositionPerYear).toHaveBeenNthCalledWith(1, 13)
  })

  it('取得したいデータが複数キャッシュにない場合', async () => {
    ;(getCompositionPerYear as jest.Mock)
      .mockReturnValueOnce(Promise.resolve(COMPOSITION_PER_PREF_LIST[0].data))
      .mockReturnValueOnce(Promise.resolve(COMPOSITION_PER_PREF_LIST[1].data))
    mockingUseSwr([])
    const { cacheMock } = mockingSwrConfig()

    await renderHook(() => useCompositionPerYear(COMPOSITION_PER_PREF_LIST))

    expect((useSWR as jest.Mock).mock.calls[0][0]).toBe('all-1,13')

    expect(getCompositionPerYear).toHaveBeenNthCalledWith(1, 1)
    expect(getCompositionPerYear).toHaveBeenNthCalledWith(2, 13)

    expect(cacheMock.set).toHaveBeenNthCalledWith(1, 'composition-1', {
      data: COMPOSITION_PER_PREF_LIST[0]
    })
    expect(cacheMock.set).toHaveBeenNthCalledWith(2, 'composition-13', {
      data: COMPOSITION_PER_PREF_LIST[1]
    })
  })

  it('取得したい都道府県だけreturnされていること', async () => {
    const { prefCode, prefName } = COMPOSITION_PER_PREF_LIST[0]
    mockingUseSwr([])
    mockingSwrConfig(['composition-1'], COMPOSITION_PER_PREF_LIST)
    const { result } = await renderHook(() =>
      useCompositionPerYear([{ prefCode, prefName }])
    )

    expect(result.current.data).toEqual([COMPOSITION_PER_PREF_LIST[0]])
  })
})
