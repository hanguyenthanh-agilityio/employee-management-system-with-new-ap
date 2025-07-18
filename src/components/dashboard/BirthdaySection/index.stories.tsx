import type { Meta, StoryObj } from '@storybook/react';
import BirthdaySection from '.';

const meta = {
  title: 'Components/BirthdaySection',
  component: BirthdaySection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BirthdaySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
