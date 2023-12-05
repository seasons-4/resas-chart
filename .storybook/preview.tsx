import React from 'react'
import { Noto_Sans_JP } from 'next/font/google'

import type { Preview } from '@storybook/react'

import 'destyle.css'
import '../src/app/globals.scss'

const notoSansJp = Noto_Sans_JP({
  preload: false
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    nextjs: {
      appDirectory: true
    }
  },
  decorators: [
    (Story) => {
      return (
        <div className={notoSansJp.className}>
          <Story />
        </div>
      )
    }
  ]
}

export default preview
