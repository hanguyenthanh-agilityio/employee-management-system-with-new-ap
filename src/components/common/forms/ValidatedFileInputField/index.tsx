'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FileInputField, FileInputFieldProps } from '../FileInputField';

interface ValidatedFileInputFieldProps<T extends FieldValues>
  extends Omit<FileInputFieldProps, 'name' | 'errorMessage' | 'onChange'> {
  control: Control<T>;
  name: Path<T>;
  onFileChange?: (file: File | null) => void;
}

const ValidatedFileInputField = <T extends FieldValues>({
  control,
  name,
  onFileChange,
  ...props
}: ValidatedFileInputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FileInputField
          {...props}
          name={name}
          errorMessage={fieldState.error?.message}
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            field.onChange(file);
            if (onFileChange) onFileChange(file);
          }}
        />
      )}
    />
  );
};

export default ValidatedFileInputField;
