'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { InputField, InputFieldProps } from '../InputField';

interface ValidatedInputFieldProps<T extends FieldValues>
  extends Omit<InputFieldProps, 'name' | 'errorMessage'> {
  control: Control<T>;
  name: Path<T>;
}

const ValidatedInputField = <T extends FieldValues>({
  control,
  name,
  ...props
}: ValidatedInputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputField
          {...props}
          {...field}
          name={name}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
};

export default ValidatedInputField;
