'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { RequiredLabel } from '@/components';
import MaskedInput from '../../inputs/MaskedInput';

export interface MaskedInputFieldProps
  extends React.ComponentProps<typeof MaskedInput> {
  name: string;
  label: string;
  mask: string;
  errorMessage?: string | string[];
  required?: boolean;
  containerClassName?: string;
}

export const MaskedInputField = React.forwardRef<
  HTMLInputElement,
  MaskedInputFieldProps
>(
  (
    {
      name,
      label,
      mask,
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

        <MaskedInput
          ref={ref}
          id={name}
          mask={mask}
          name={name}
          className={cn(
            'input-base',
            hasError ? 'input-error' : 'input-profile',
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

MaskedInputField.displayName = 'MaskedInputField';
