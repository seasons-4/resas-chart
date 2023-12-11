import { CompositionChart } from './CompositionChart'

import type { Meta, StoryObj } from '@storybook/react'

// TODO: テスト作成時にモックデータの記述位置について検討すること
const mockData = [
  {
    prefCode: 1 as const,
    prefName: '北海道',
    data: {
      boundaryYear: 2020,
      data: [
        {
          label: '総人口' as const,
          data: [
            { year: 1990, value: 5643647 },
            { year: 2000, value: 5683062 },
            { year: 2010, value: 5506419 },
            { year: 2020, value: 5224614 },
            { year: 2030, value: 4791592 },
            { year: 2040, value: 4280427 }
          ]
        },
        {
          label: '年少人口' as const,
          data: [
            { year: 1990, value: 1034251 },
            { year: 2000, value: 792352 },
            { year: 2010, value: 657312 },
            { year: 2020, value: 555804 },
            { year: 2030, value: 465307 },
            { year: 2040, value: 391086 }
          ]
        },
        {
          label: '生産年齢人口' as const,
          data: [
            { year: 1990, value: 3924717 },
            { year: 2000, value: 3832902 },
            { year: 2010, value: 3482169 },
            { year: 2020, value: 2945727 },
            { year: 2030, value: 2594718 },
            { year: 2040, value: 2140781 }
          ]
        },
        {
          label: '老年人口' as const,
          data: [
            { year: 1990, value: 674881 },
            { year: 2000, value: 1031552 },
            { year: 2010, value: 1358068 },
            { year: 2020, value: 1664023 },
            { year: 2030, value: 1731567 },
            { year: 2040, value: 1748560 }
          ]
        }
      ]
    }
  },
  {
    prefCode: 13 as const,
    prefName: '東京都',
    data: {
      boundaryYear: 2020,
      data: [
        {
          label: '総人口' as const,
          data: [
            { year: 1990, value: 11855563 },
            { year: 2000, value: 12064101 },
            { year: 2010, value: 13159388 },
            { year: 2020, value: 14047594 },
            { year: 2030, value: 13882538 },
            { year: 2040, value: 13758624 }
          ]
        },
        {
          label: '年少人口' as const,
          data: [
            { year: 1990, value: 1727479 },
            { year: 2000, value: 1420919 },
            { year: 2010, value: 1477371 },
            { year: 2020, value: 1566840 },
            { year: 2030, value: 1471373 },
            { year: 2040, value: 1432251 }
          ]
        },
        {
          label: '生産年齢人口' as const,
          data: [
            { year: 1990, value: 8790525 },
            { year: 2000, value: 8685878 },
            { year: 2010, value: 8850225 },
            { year: 2020, value: 8944193 },
            { year: 2030, value: 8988837 },
            { year: 2040, value: 8330069 }
          ]
        },
        {
          label: '老年人口' as const,
          data: [
            { year: 1990, value: 1244026 },
            { year: 2000, value: 1910456 },
            { year: 2010, value: 2642231 },
            { year: 2020, value: 3107822 },
            { year: 2030, value: 3422328 },
            { year: 2040, value: 3996304 }
          ]
        }
      ]
    }
  }
]

const meta = {
  title: 'prefectureChart/CompositionChart',
  component: CompositionChart,
  tags: ['autodocs'],
  args: {
    data: mockData,
    chartLabel: '総人口'
  },
  parameters: {}
} satisfies Meta<typeof CompositionChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
