'use client';

import { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

import Textarea from '../Textarea/textarea';
import PasswordInput from '@/components/auth/PasswordInput';
import MaskedInput from '../MaskedInput';
import FileInput from '../FileInput';
import Input from '../Input/input';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

type InputAs = 'input' | 'textarea' | 'password' | 'masked' | 'file';

type InputFieldProps<T extends FieldValues, N extends FieldPath<T>> = {
  as: InputAs; // input type
  name: string;
  id?: string;
  field?: ControllerRenderProps<T, N>;
  value?: string | number | readonly string[];
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  classNameInput?: string;
  rows?: number;
  mask?: string;
  type?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

// Type helps to assign separate extraProps for each input type
type InputExtraProps = {
  input: React.InputHTMLAttributes<HTMLInputElement>;
  password: React.InputHTMLAttributes<HTMLInputElement>;
  textarea: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  masked: { mask?: string } & React.InputHTMLAttributes<HTMLInputElement>;
  file: React.InputHTMLAttributes<HTMLInputElement>;
};

// Get actual component based on as
const componentMapping: Record<InputAs, React.ElementType> = {
  input: Input,
  textarea: Textarea,
  password: PasswordInput,
  masked: MaskedInput,
  file: FileInput,
};

// Configure default class (baseClass) and extraProps for each input type
const configMapping: {
  [K in InputAs]: (options: {
    rows?: number;
    mask?: string;
    type?: string;
  }) => {
    className: string;
    extraProps?: Partial<InputExtraProps[K]>;
    omitValue?: boolean; // omitValue is only used for input files
  };
} = {
  input: ({ type }) => ({
    className: 'input-base cursor-interactive',
    extraProps: { type: type ?? 'text' },
  }),
  textarea: ({ rows }) => ({
    className: 'textarea-base',
    extraProps: { rows: rows ?? 3 },
  }),
  password: () => ({
    className: 'input-base cursor-interactive',
    extraProps: { type: 'password' },
  }),
  masked: ({ mask }) => ({
    className: 'input-base cursor-interactive',
    extraProps: { mask },
  }),
  file: () => ({
    className: 'file-input-base',
    omitValue: true,
  }),
};

const InputField = <T extends FieldValues, N extends FieldPath<T>>({
  as,
  name,
  field,
  value,
  error,
  onChange,
  className,
  classNameInput,
  rows,
  mask,
  type,
  inputProps,
}: InputFieldProps<T, N>) => {
  const Component = componentMapping[as];

  // Default config of each input type
  const {
    className: baseClass,
    extraProps,
    omitValue,
  } = configMapping[as]({
    rows,
    mask,
    type,
  });

  /**
   * _omitValue is removed: avoid passing value directly from field, so we can bind value separately
   * Do not set value because browser does not allow setting value for input file
   */
  const { value: _omitValue, ...restField } = field ?? {};

  const commonProps = {
    id: name,
    className: cn(baseClass, error ? 'input-error' : classNameInput, className),
    error,
    onChange,
    ...restField,
    ...inputProps,
    ...(omitValue ? {} : { value: value ?? field?.value ?? '' }),
  };

  return <Component {...commonProps} {...extraProps} />;
};

export default InputField;
