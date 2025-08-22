'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { MaskedInputField, MaskedInputFieldProps } from '../MaskInputField';

interface ValidatedMaskedInputFieldProps<T extends FieldValues>
  extends Omit<MaskedInputFieldProps, 'name' | 'errorMessage'> {
  control: Control<T>;
  name: Path<T>;
}

const ValidatedMaskedInputField = <T extends FieldValues>({
  control,
  name,
  ...props
}: ValidatedMaskedInputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MaskedInputField
          {...props}
          {...field}
          name={name}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
};

export default ValidatedMaskedInputField;
