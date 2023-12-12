import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'

import { COMPOSITION_PER_PREF_LIST } from '../../test/mock'
import { Chart } from '../Chart'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'prefectureChart/Chart',
  component: Chart,
  tags: ['autodocs'],
  args: {
    data: COMPOSITION_PER_PREF_LIST,
    chartLabel: '総人口'
  },
  parameters: {}
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PlayRenderTitle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const listItems = canvas.getByText('総人口推移')
    await expect(listItems).toBeInTheDocument()
  }
}

export const PlayRenderTitleProps: Story = {
  args: {
    chartTitle: 'Propsタイトル'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const listItems = canvas.getByText('Propsタイトル')
    await expect(listItems).toBeInTheDocument()
  }
}

export const PlayRenderTitleNoData: Story = {
  args: {
    data: []
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const listItems = canvas.getByText('都道府県を選択してください')
    await expect(listItems).toBeInTheDocument()
  }
}
