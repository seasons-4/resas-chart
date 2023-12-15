import { expect, jest } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { SelectableCheckbox } from '../SelectableCheckbox'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'prefectureChart/SelectableCheckbox',
  component: SelectableCheckbox,
  tags: ['autodocs'],
  args: {
    data: [...Array(5).keys()].map((i) => ({
      prefCode: i + 1,
      prefName: `県${i + 1}`
    }))
  },
  parameters: {}
} satisfies Meta<typeof SelectableCheckbox>

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
    const listItems = await canvas.findAllByRole('listitem')
    expect(listItems).toHaveLength(5)

    // default checkedテスト
    const firstCheckbox = await canvas.findByRole('checkbox', { name: '県1' })
    expect(firstCheckbox).toBeChecked()

    const secondCheckbox = await canvas.findByRole('checkbox', { name: '県2' })
    expect(secondCheckbox).not.toBeChecked()

    // 県2をtrueにする
    userEvent.click(secondCheckbox)
    // 県1をfalseにする
    userEvent.click(firstCheckbox)

    const submitButton = await canvas.findByRole('button', { name: '検索' })
    userEvent.click(submitButton)

    await waitFor(() =>
      expect(mockRouterPush).toHaveBeenNthCalledWith(1, '/?prefecture=2')
    )
  }
}
