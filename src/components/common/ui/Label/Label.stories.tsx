import type { Meta, StoryObj } from '@storybook/react';
import Label from './label';

const meta: Meta<typeof Label> = {
  title: 'Components/Common/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Default Label',
    htmlFor: 'input-id',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: {
    children: 'Label with red text',
    className: 'text-red',
  },
};
