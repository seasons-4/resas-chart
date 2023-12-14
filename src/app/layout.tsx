import { Noto_Sans_JP } from 'next/font/google'

import { SWRProvider } from '@/lib/swr'

import type { Metadata } from 'next'

import 'destyle.css'
import './globals.scss'

const notoSansJp = Noto_Sans_JP({
  preload: false
})

const SITE_TITLE = 'resas chart' as const
const SITE_DESCRIPTION =
  'RESAS(地域経済分析システム)APIを使用したグラフ描画アプリケーション' as const

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_BASE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_BASE_URL
  },
  openGraph: {
    type: 'website',
    title: SITE_TITLE,
    url: process.env.NEXT_PUBLIC_SITE_BASE_URL,
    description: SITE_DESCRIPTION
  }
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
