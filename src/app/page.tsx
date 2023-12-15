import clsx from 'clsx'

import { ChartContainer, SelectableLabels } from '@/features/compositionChart'
import { SelectableCheckbox, getPrefectures } from '@/features/prefectures'

import styles from './page.module.scss'

export default async function Home() {
  const res = await getPrefectures().catch(() => [])
  // NOTE: 都道府県一覧マスターデータが空の場合はビルドを失敗させる
  if (res.length === 0) throw new Error('prefectures data is empty')

  return (
    <section className={clsx(styles['main'])}>
      <h1 className={clsx(styles['page-title'])}>地域・年単位の年齢構成</h1>
      <main className={clsx(styles['page-contents'])}>
        <div className={clsx(styles['sub-section'])}>
          <SelectableCheckbox data={res} />
        </div>
        <div className={clsx(styles['main-section'])}>
          <div className={clsx(styles['large-content'])}>
            <ChartContainer prefBaseData={res} />
          </div>
          <div className={clsx(styles['small-content'])}>
            <SelectableLabels />
          </div>
        </div>
      </main>
    </section>
  )
}
