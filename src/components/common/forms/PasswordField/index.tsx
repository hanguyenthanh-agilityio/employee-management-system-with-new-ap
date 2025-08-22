'use client';

import React from 'react';
import { RequiredLabel } from '@/components';
import { cn } from '@/lib/utils';
import PasswordInput from '@/components/auth/PasswordInput';

export interface PasswordFieldProps
  extends React.ComponentProps<typeof PasswordInput> {
  name: string;
  label: string;
  errorMessage?: string | string[];
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(
  (
    {
      name,
      label,
      errorMessage,
      required,
      containerClassName,
      className,
      labelClassName = 'form-label',
      inputClassName = 'input-profile',
      ...props
    },
    ref,
  ) => {
    const error = Array.isArray(errorMessage)
      ? errorMessage.join(', ')
      : errorMessage;
    const hasError = Boolean(error);

    return (
      <div className={cn('w-full flex flex-col gap-1', containerClassName)}>
        <RequiredLabel
          className={labelClassName}
          label={label}
          htmlFor={name}
          required={required}
        />

        <PasswordInput
          ref={ref}
          id={name}
          name={name}
          className={cn(
            'input-base',
            hasError ? 'input-error' : inputClassName,
            className,
          )}
          aria-invalid={hasError}
          {...props}
        />
        {hasError && <p className="text-sm text-red mt-1">{error}</p>}
      </div>
    );
  },
);

PasswordField.displayName = 'PasswordField';
