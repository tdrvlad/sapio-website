import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DarkToggle } from './DarkToggle';

const meta = {
  title: 'Components/Toggle/DarkToggle',
  component: DarkToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DarkToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

