import { expect, jest } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'

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

const mockRouterPush = jest.fn()
export const PlayClick: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {
          prefecture: ['1']
        },
        push: mockRouterPush
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // propsのレンダリングテスト
    const listItems = canvas.getAllByRole('listitem')
    expect(listItems).toHaveLength(5)

    // default checkedテスト
    const firstCheckbox = canvas.getByRole('checkbox', { name: '県1' })
    expect(firstCheckbox).toBeChecked()

    const secondCheckbox = canvas.getByRole('checkbox', { name: '県2' })
    expect(secondCheckbox).not.toBeChecked()

    // クリックイベントテスト
    userEvent.click(secondCheckbox)
    await waitFor(() =>
      expect(mockRouterPush).toHaveBeenNthCalledWith(
        1,
        '/?prefecture=1&prefecture=2'
      )
    )
  }
}
