'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import RequiredLabel from '../RequiredLabel';
import Input from '../../inputs/Input/input';
import { InputFieldType } from '@/types/form';

export const InputField = React.forwardRef<HTMLInputElement, InputFieldType>(
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

        <Input
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

InputField.displayName = 'InputField';
