import { ComponentPropsWithoutRef } from 'react';

export interface InputFieldType extends ComponentPropsWithoutRef<'input'> {
  name: string;
  label: string;
  errorMessage?: string | string[];
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}
