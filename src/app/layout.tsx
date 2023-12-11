import { Noto_Sans_JP } from 'next/font/google'

import { SWRProvider } from '@/lib/swr'

import type { Metadata } from 'next'

import 'destyle.css'
import './globals.scss'

const notoSansJp = Noto_Sans_JP({
  preload: false
})

export const metadata: Metadata = {
  title: 'resas chart',
  description:
    'RESAS(地域経済分析システム)APIを使用したグラフ描画アプリケーション'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  )
}
