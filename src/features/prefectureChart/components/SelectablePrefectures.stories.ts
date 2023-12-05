import { SelectablePrefectures } from './SelectablePrefectures'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'prefectureChart/SelectablePrefectures',
  component: SelectablePrefectures,
  tags: ['autodocs'],
  args: {
    data: [...Array(5).keys()].map((i) => ({
      prefCode: i + 1,
      prefName: `県${i + 1}`
    }))
  },
  parameters: {}
} satisfies Meta<typeof SelectablePrefectures>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}
