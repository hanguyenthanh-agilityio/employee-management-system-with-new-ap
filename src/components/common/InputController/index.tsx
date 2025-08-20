'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { ChangeEvent } from 'react';
import { Label } from '@/components';
import InputField from '../InputField';

interface InputControllerProps<T extends FieldValues> {
  control: Control<T>;
  htmlFor: string;
  name: Path<T>;
  type?: string;
  label?: string;
  required?: boolean;
  as?: 'input' | 'textarea' | 'password' | 'masked' | 'file';
  className?: string;
  rows?: number;
  mask?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  classNameLabel?: string;
  classNameInput?: string;
}

export default function InputController<T extends FieldValues>({
  control,
  name,
  htmlFor,
  label,
  required,
  type = 'text',
  as = 'input',
  className,
  rows,
  mask,
  onChange,
  inputProps,
  classNameLabel,
  classNameInput,
}: InputControllerProps<T>) {
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

          return (
            <InputField
              as={as}
              type={type}
              mask={mask}
              rows={rows}
              field={field}
              error={error}
              onChange={handleChange}
              inputProps={inputProps}
              name={name}
              className={className}
              classNameInput={classNameInput}
            />
          );
        }}
      />
    </div>
  );
}
