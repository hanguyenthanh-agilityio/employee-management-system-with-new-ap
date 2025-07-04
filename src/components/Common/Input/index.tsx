import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  icon?: ReactNode;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, labelClassName, inputClassName, icon, error, id, ...props },
    ref,
  ) => {
    return (
      <div>
        <label htmlFor={id} className={labelClassName}>
          {label}
          {icon}
        </label>
        <input
          id={id}
          {...props}
          ref={ref}
          className={`w-full border-[2px] border-mediumLightGray rounded-md ${inputClassName}`}
        />
        {error && <p className="text-red text-sm mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
