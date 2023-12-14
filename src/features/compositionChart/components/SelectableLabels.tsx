'use client'

import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { memo } from 'react'

import { LabeledRadio } from '@/components/LabeledRadio'

import styles from './ui/SelectableLabels.module.scss'
import { CHART_LABELS, LABEL_QUERY_KEY } from '../constants'
import { isCompositionPerYearLabel } from '../filters'

/**
 * 人口構成のラベルを選択するフォーム
 */
export const SelectableLabels = memo(() => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const queryLabel = searchParams.get(LABEL_QUERY_KEY)
  const currentLabel = isCompositionPerYearLabel(queryLabel)
    ? queryLabel
    : CHART_LABELS[0]

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set(LABEL_QUERY_KEY, e.target.value)
    newSearchParams.sort()
    // NOTE: decodeURI() はrouter.push内で実行してくれるため不要だが、明示的に指定しておく（重複による副作用がないため）
    router.push(`${pathName}?${decodeURI(newSearchParams.toString())}`)
  }

  const onClickClear = () => {
    router.push(`${pathName}?${LABEL_QUERY_KEY}=${CHART_LABELS[0]}`)
  }

  return (
    <form>
      <fieldset className={clsx(styles['container'])}>
        <legend className={clsx(styles['title'])}>人口構成の種類を選択</legend>

        <button
          type="button"
          className={clsx(styles['sub-title'])}
          onClick={onClickClear}
        >
          <span className={clsx(styles['link-text'])}>選択をクリア</span>
        </button>

        <ul className={clsx(styles['flexible-list'])}>
          {CHART_LABELS.map((label) => (
            <li key={label}>
              <LabeledRadio
                value={label}
                name={label}
                checked={label === currentLabel}
                onChange={onChange}
              >
                {label}
              </LabeledRadio>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  )
})

SelectableLabels.displayName = 'SelectableLabels'
