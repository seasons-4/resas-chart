'use client'

import clsx from 'clsx'
import { memo } from 'react'

import { LabeledCheckbox } from '@/components/LabeledCheckbox'

import styles from './ui/SelectablePrefectures.module.scss'
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
export const SelectableForm = memo(({ data }: Props) => {
  const [selectedPrefectures, updateQueryParams] = usePrefectureQuery()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParams(e.target.value)
  }

  return (
    <form>
      <fieldset className={clsx(styles['container'])}>
        <legend className={clsx(styles.title)}>
          都道府県を選択してください
        </legend>
        <ol className={clsx(styles['flexible-list'])}>
          {data.map(({ prefCode, prefName }) => (
            <li key={prefCode}>
              <LabeledCheckbox
                id={String(prefCode)}
                name={prefName}
                value={prefCode}
                onChange={onChange}
                checked={selectedPrefectures.includes(String(prefCode))}
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

SelectableForm.displayName = 'SelectablePrefectures'
