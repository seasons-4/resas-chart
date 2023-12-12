import { SelectableForm } from './SelectableForm'
import { getPrefectures } from '../api/getPrefectures'

/**
 * SelectablePrefectures.tsxのコンテナコンポーネント
 */
export const SelectablePrefecturesContainer = async () => {
  const res = await getPrefectures().catch(() => [])

  // TODO: エラーハンドリング時のUIを作成する
  if (res.length === 0) return <div>データがありません</div>

  return <SelectableForm data={res} />
}
