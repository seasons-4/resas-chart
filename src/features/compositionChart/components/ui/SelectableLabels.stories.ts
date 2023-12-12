import { expect, jest } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { SelectableLabels } from '../SelectableLabels'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'prefectureChart/SelectableLabels',
  component: SelectableLabels,
  tags: ['autodocs'],
  args: {},
  parameters: {}
} satisfies Meta<typeof SelectableLabels>

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
          label: '年少人口'
        },
        push: mockRouterPush
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // propsのレンダリングテスト
    const listItems = canvas.getAllByRole('listitem')
    expect(listItems).toHaveLength(4)

    // default checkedテスト
    const firstCheckbox = canvas.getByRole('radio', { name: '年少人口' })
    expect(firstCheckbox).toBeChecked()

    const secondCheckbox = canvas.getByRole('radio', { name: '総人口' })
    expect(secondCheckbox).not.toBeChecked()

    // // クリックイベントテスト
    await userEvent.click(secondCheckbox)
    await waitFor(() =>
      expect(mockRouterPush).toHaveBeenNthCalledWith(1, '/?label=総人口')
    )
  }
}
