import type { Meta, StoryObj } from '@storybook/react';
import ActionsDropdown from '.';

const meta = {
  title: 'Components/ActionsDropdown',
  component: ActionsDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'edit clicked' },
    onDelete: { action: 'delete clicked' },
  },
} satisfies Meta<typeof ActionsDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onEdit: () => {},
    onDelete: () => {},
  },
};
