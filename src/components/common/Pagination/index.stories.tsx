import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '.';

const meta = {
  title: 'Components/common/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    onPageChange: {
      action: 'page changed',
      description: 'Callback when page is changed',
    },
  },
  args: {
    currentPage: 1,
    totalPages: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPageChange: () => {},
  },
};
export const MiddlePage: Story = {
  args: {
    onPageChange: () => {},
    currentPage: 5,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    onPageChange: () => {},
    currentPage: 10,
    totalPages: 10,
  },
};

export const FewPages: Story = {
  args: {
    onPageChange: () => {},
    currentPage: 1,
    totalPages: 3,
  },
};

export const OnePageOnly: Story = {
  args: {
    onPageChange: () => {},
    currentPage: 1,
    totalPages: 1,
  },
};
