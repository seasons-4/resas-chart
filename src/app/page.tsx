import clsx from 'clsx'

import { ChartContainer, SelectableLabels } from '@/features/compositionChart'
import { SelectableCheckbox, getPrefectures } from '@/features/prefectures'

import styles from './page.module.scss'

export default async function Home() {
  const res = await getPrefectures().catch(() => [])
  // NOTE: 都道府県一覧マスターデータが空の場合はビルドを失敗させる
  if (res.length === 0) throw new Error('prefectures data is empty')

  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(styles['sub-section'])}>
        <SelectableCheckbox data={res} />
      </div>
      <section className={clsx(styles['main-section'])}>
        <SelectableLabels />
        <ChartContainer prefBaseData={res} />
      </section>
    </main>
  )
}
