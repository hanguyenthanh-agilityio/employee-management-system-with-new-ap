'use client';

import React from 'react';
import { RequiredLabel, Textarea } from '@/components';
import { cn } from '@/lib/utils';

export interface TextareaFieldProps
  extends React.ComponentProps<typeof Textarea> {
  name: string;
  label: string;
  errorMessage?: string | string[];
  required?: boolean;
  containerClassName?: string;
}

export const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
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
        <Textarea
          ref={ref}
          id={name}
          name={name}
          className={cn(
            'textarea-base',
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

TextareaField.displayName = 'TextareaField';
