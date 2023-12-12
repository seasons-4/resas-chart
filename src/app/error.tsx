'use client'

import clsx from 'clsx'

import style from './error.module.scss'

export default function ErrorPage() {
  return (
    <main className={clsx(style['container'])}>
      URLをご確認の上、ページの再読み込みをお願いします。
    </main>
  )
}
