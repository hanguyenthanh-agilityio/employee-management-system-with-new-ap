'use client';

import {
  Controller,
  Control,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';
import { InputField } from '@/components/common/forms/InputField';
import { InputFieldType } from '@/types/form';

interface ValidatedInputFieldProps<T extends FieldValues>
  extends Omit<InputFieldType, 'name' | 'errorMessage'> {
  control: Control<T>;
  name: Path<T>;
  rules?: UseControllerProps<T, Path<T>>['rules'];
}

const ValidatedInputField = <T extends FieldValues>({
  control,
  name,
  rules,

  ...props
}: ValidatedInputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
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

ValidatedInputField.displayName = 'ValidatedInputField';

export default ValidatedInputField;
