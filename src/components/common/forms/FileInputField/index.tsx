'use client';

import React from 'react';
import { Input, RequiredLabel } from '@/components';
import { cn } from '@/lib/utils';

export interface FileInputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  label: string;
  errorMessage?: string | string[];
  required?: boolean;
  containerClassName?: string;
}

export const FileInputField = React.forwardRef<
  HTMLInputElement,
  FileInputFieldProps
>(
  (
    {
      name,
      label,
      errorMessage,
      required,
      containerClassName,
      className,
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
          className="form-label"
          label={label}
          htmlFor={name}
          required={required}
        />

        <Input
          ref={ref}
          id={name}
          name={name}
          type="file"
          className={cn(
            'input-file cursor-interactive',
            hasError ? 'input-error' : 'input-profile',
            className,
          )}
          aria-invalid={hasError}
          {...props}
        />

        {hasError && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  },
);

FileInputField.displayName = 'FileInputField';
