import clsx from 'clsx'

import styles from './index.module.scss'

type Props = {
  children: React.ReactNode
} & Partial<Omit<React.ComponentProps<'input'>, 'type'>>

/**
 * スタイルされたラベル付きのチェックボックスコンポーネント
 *
 * @param children - チェックボックスのラベルとして表示する要素
 * @param props - チェックボックスに適用するプロパティ
 */
export const LabeledCheckbox = ({ children, ...props }: Props) => {
  return (
    <label htmlFor={props.id} className={clsx(styles['label'])}>
      <input {...props} type="checkbox" />
      <span className={styles['checkbox']} />
      {children}
    </label>
  )
}
