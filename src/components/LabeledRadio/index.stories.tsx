import type { Meta, StoryObj } from '@storybook/react'

import { LabeledRadio } from '.'

const meta = {
  title: 'components/LabeledRadio',
  component: LabeledRadio,
  tags: ['autodocs'],
  args: {},
  parameters: {}
} satisfies Meta<typeof LabeledRadio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <span>sample text</span>
  }
}
