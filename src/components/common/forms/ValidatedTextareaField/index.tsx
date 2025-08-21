'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextareaField, TextareaFieldProps } from '../TextareaField';

interface ValidatedTextareaFieldProps<T extends FieldValues>
  extends Omit<TextareaFieldProps, 'name' | 'errorMessage'> {
  control: Control<T>;
  name: Path<T>;
}

const ValidatedTextareaField = <T extends FieldValues>({
  control,
  name,
  ...props
}: ValidatedTextareaFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextareaField
          {...props}
          {...field}
          name={name}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
};

export default ValidatedTextareaField;
