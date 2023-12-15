'use client'

import clsx from 'clsx'
import { memo } from 'react'

import { LabeledCheckbox } from '@/components/LabeledCheckbox'

import styles from './ui/SelectableCheckbox.module.scss'
import { usePrefectureQuery } from '../hooks/usePrefectureQuery'

import type { ResasPrefecture } from '@/types'

type Props = {
  data: ResasPrefecture[]
}

/**
 * 都道府県を選択するフォーム
 *
 * @param data - 都道府県の一覧
 */
export const SelectableCheckbox = memo(({ data }: Props) => {
  const [selectedPrefectures, updateQueryParams] = usePrefectureQuery()

  const formAction = (formData: FormData) => {
    const prefCodes = formData
      .getAll('prefecture')
      .map((prefCode) => Number(prefCode))
    updateQueryParams(prefCodes)
  }

  return (
    <form action={formAction} className={clsx(styles['wrapper'])}>
      <button type="submit" className={clsx(styles['absolute-button'])}>
        検索
      </button>
      <fieldset className={clsx(styles['container'])}>
        <legend className={clsx(styles['title'])}>都道府県を選択</legend>
        <ol className={clsx(styles['flexible-list'])}>
          {data.map(({ prefCode, prefName }) => (
            <li key={prefCode}>
              <LabeledCheckbox
                id={String(prefCode)}
                name="prefecture"
                value={prefCode}
                defaultChecked={selectedPrefectures.includes(String(prefCode))}
              >
                {prefName}
              </LabeledCheckbox>
            </li>
          ))}
        </ol>
      </fieldset>
    </form>
  )
})

SelectableCheckbox.displayName = 'SelectableCheckbox'
