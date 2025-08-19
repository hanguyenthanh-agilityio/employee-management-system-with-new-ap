/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { Input, Label, Textarea } from '@/components';
import { ChangeEvent } from 'react';
import PasswordInput from '@/components/auth/PasswordInput';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  htmlFor: string;
  name: Path<T>;
  type?: string;
  label?: string;
  required?: boolean;
  as?: 'input' | 'textarea' | 'password';
  className?: string;
  rows?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputProps?: Record<string, any>;
  classNameLabel?: string;
  classNameInput?: string;
}

function FormInput<T extends FieldValues>({
  control,
  name,
  htmlFor,
  type = 'text',
  label,
  required,
  as = 'input',
  className,
  rows,
  onChange,
  inputProps,
  classNameLabel,
  classNameInput,
}: FormInputProps<T>) {
  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={htmlFor} className={classNameLabel}>
          {label}
          {required && <span className="text-red"> *</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const error = fieldState.error?.message;

          const handleChange = (
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            field.onChange(e);
            onChange?.(e);
          };
          if (as === 'textarea') {
            return (
              <>
                <Textarea
                  id={name}
                  rows={rows ?? 3}
                  className={cn(
                    'textarea-base',
                    error ? 'input-error' : 'input-profile',
                    className,
                  )}
                  {...field}
                  error={error}
                  onChange={handleChange}
                />
              </>
            );
          }

          if (as === 'password') {
            return (
              <PasswordInput
                id={name}
                className={cn(
                  'input-base cursor-interactive',
                  error ? 'input-error' : classNameInput,
                  className,
                )}
                {...field}
                {...inputProps}
                error={error}
                onChange={handleChange}
              />
            );
          }

          return (
            <>
              <Input
                id={name}
                type={type}
                className={cn(
                  'input-base cursor-interactive',
                  error ? 'input-error' : classNameInput,
                  className,
                )}
                {...field}
                {...inputProps}
                error={error}
                onChange={handleChange}
              />
            </>
          );
        }}
      />
    </div>
  );
}

export default FormInput;
