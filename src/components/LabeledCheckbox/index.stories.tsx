import type { Meta, StoryObj } from '@storybook/react'

import { LabeledCheckbox } from './'

const meta = {
  title: 'components/LabeledCheckbox',
  component: LabeledCheckbox,
  tags: ['autodocs'],
  args: {},
  parameters: {}
} satisfies Meta<typeof LabeledCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <span>sample text</span>
  }
}
