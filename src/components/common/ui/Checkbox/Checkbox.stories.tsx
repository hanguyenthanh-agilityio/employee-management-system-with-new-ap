import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Checkbox from './checkbox';

const meta = {
  title: 'Components/Common/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const CheckboxWithLabel = ({
  label,
  ...checkboxProps
}: React.ComponentProps<typeof Checkbox> & { label?: string }) => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        {...checkboxProps}
      />
      <span>{label}</span>
    </label>
  );
};

export const Default: Story = {
  render: () => <CheckboxWithLabel label="Remember Me" />,
};

export const Disabled: Story = {
  render: () => <CheckboxWithLabel label="Disabled" disabled />,
};
