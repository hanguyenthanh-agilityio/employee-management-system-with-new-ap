import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  subLabel?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, subLabel, ...props }, ref) => (
    <label
      htmlFor={id}
      className="flex items-center space-x-2 pb-3 max-w-[400px]"
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="form-checkbox w-[20px] h-[20px] text-mediumLightGray"
        {...props}
      />
      <span className="text-sm md:text-xl text-Gray56">
        {label}
        {subLabel && <span className="text-primary ml-1">{subLabel}</span>}
      </span>
    </label>
  ),
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
