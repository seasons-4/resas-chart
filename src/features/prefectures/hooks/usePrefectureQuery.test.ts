import { act, renderHook } from '@testing-library/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { usePrefectureQuery } from './usePrefectureQuery'

/**
 * NOTE: JestのランタイムでもURLSearchParams.prototype.delete の第二引数の指定が機能するようpolyfillする
 * アプリケーション起動時はNext.jsのデフォルトのcore-jsによるpolyfillでサポートされているためテスト時のみ追加
 * https://nextjs.org/docs/architecture/supported-browsers
 */
import 'url-search-params-delete'

jest.mock('next/navigation')
function mockNavigation(baseParams: string = 'prefecture=1&other=test') {
  const mockUsePathname: jest.Mocked<typeof usePathname> = (
    usePathname as jest.Mock
  ).mockReturnValue('/test')

  const mockUseSearchParams: jest.Mocked<typeof useSearchParams> = (
    useSearchParams as jest.Mock
  ).mockReturnValueOnce(new URLSearchParams(baseParams))

  const mockUseRouter: jest.Mocked<typeof useRouter> = (
    useRouter as jest.Mock
  ).mockReturnValue({
    push: jest.fn()
  })

  return {
    mockUseRouter,
    mockUseSearchParams,
    mockUsePathname
  }
}

describe('usePrefectureQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('現在のprefectureクエリパラメーターを取得する', () => {
    mockNavigation()
    const { result } = renderHook(() => usePrefectureQuery())
    const [currentParams] = result.current

    expect(currentParams).toEqual(['1'])
  })

  it('クエリパラーメーターに新しく値を追加する場合', () => {
    const { mockUsePathname, mockUseRouter } = mockNavigation(
      'prefecture=1&prefecture=2'
    )
    const { result } = renderHook(() => usePrefectureQuery())
    const [, updateParams] = result.current

    act(() => {
      updateParams('3')
    })
    const { push } = mockUseRouter()
    expect(push).toHaveBeenNthCalledWith(
      1,
      `${mockUsePathname()}?prefecture=1&prefecture=2&prefecture=3`
    )
  })

  it('クエリパラーメーターから既存の値を削除する場合', () => {
    const { mockUsePathname, mockUseRouter } = mockNavigation(
      'prefecture=1&prefecture=2'
    )
    const { result } = renderHook(() => usePrefectureQuery())
    const [, updateParams] = result.current

    act(() => {
      updateParams('1')
    })
    const { push } = mockUseRouter()
    expect(push).toHaveBeenNthCalledWith(1, `${mockUsePathname()}?prefecture=2`)
  })

  it('他のクエリパラメーターが存在する場合', () => {
    const { mockUsePathname, mockUseRouter } = mockNavigation()
    const { result } = renderHook(() => usePrefectureQuery())
    const [, updateParams] = result.current

    act(() => {
      updateParams('2')
    })
    const { push } = mockUseRouter()
    expect(push).toHaveBeenNthCalledWith(
      1,
      `${mockUsePathname()}?other=test&prefecture=1&prefecture=2`
    )
  })
})
