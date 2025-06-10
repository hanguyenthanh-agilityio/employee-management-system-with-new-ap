'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Component
import Form from '.';

// Types & Schemas
import {
  LeaveApplicationInput,
  leaveApplicationSchema,
} from '@/utils/schemas/leaveApplicationSchema';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

const Wrapper = (args: Partial<LeaveApplicationInput>) => {
  const form = useForm<LeaveApplicationInput>({
    resolver: zodResolver(leaveApplicationSchema),
    defaultValues: {
      type: args.type ?? '',
      startDate: args.startDate ?? '',
      endDate: args.endDate ?? '',
      durations: args.durations ?? 0,
      resumptionDate: args.resumptionDate ?? '',
      reason: args.reason ?? '',
    },
  });

  return (
    <Form
      form={form}
      isSubmitting={false}
      isDirty={false}
      onReset={() => form.reset()}
    />
  );
};

export const Default: Story = {
  render: () => Wrapper({}),
};

export const WithLeaveData: Story = {
  render: () =>
    Wrapper({
      type: 'Sick Leave',
      startDate: '2024-06-10',
      endDate: '2024-06-14',
      durations: 5,
      resumptionDate: '2024-06-15',
      reason: 'Medical reasons',
    }),
};
