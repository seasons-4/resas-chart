import clsx from 'clsx'

import styles from './index.module.scss'

type Props = {
  children: React.ReactNode
} & Partial<Omit<React.ComponentProps<'input'>, 'type'>>

/**
 * スタイルされたラベル付きのラジオボタンコンポーネント
 *
 * @param children - ラジオボタンのラベルとして表示する要素
 * @param props - ラジオボタンに適用するプロパティ
 */
export const LabeledRadio = ({ children, ...props }: Props) => {
  return (
    <label className={clsx(styles['label'])}>
      <input {...props} type="radio" className={clsx(styles['radio'])} />
      {children}
    </label>
  )
}
