'use client';

import { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

import Input from '../Input/input';
import Textarea from '../Textarea/textarea';
import PasswordInput from '@/components/auth/PasswordInput';
import MaskedInput from '../MaskedInput';
import FileInput from '../FileInput';

type InputAs = 'input' | 'textarea' | 'password' | 'masked' | 'file';

interface InputFieldProps {
  as: InputAs;
  name: string;
  id?: string;
  field?: Record<string, unknown>;
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
}

const componentMapping: Record<InputAs, React.ElementType> = {
  input: Input,
  textarea: Textarea,
  password: PasswordInput,
  masked: MaskedInput,
  file: FileInput,
};

const baseClassMapping: Record<InputAs, string> = {
  input: 'input-base cursor-interactive',
  textarea: 'textarea-base',
  password: 'input-base cursor-interactive',
  masked: 'input-base cursor-interactive',
  file: 'file-input-base',
};

const InputField = ({
  as,
  name,
  id,
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
}: InputFieldProps) => {
  const Component = componentMapping[as];
  const baseClass = baseClassMapping[as];
  const inputId = id ?? name;

  // textarea
  if (as === 'textarea') {
    return (
      <Component
        id={inputId}
        rows={rows ?? 3}
        value={value}
        className={cn(
          baseClass,
          error ? 'input-error' : 'input-profile',
          className,
        )}
        {...field}
        {...inputProps}
        error={error}
        onChange={onChange}
      />
    );
  }

  // masked input
  if (as === 'masked' && mask) {
    return (
      <Component
        id={inputId}
        mask={mask}
        value={value}
        className={cn(
          baseClass,
          error ? 'input-error' : classNameInput,
          className,
        )}
        {...field}
        {...inputProps}
        error={error}
        onChange={onChange}
      />
    );
  }

  // file input
  if (as === 'file') {
    const { value: _omit, ...restField } = field ?? {};

    return (
      <Component
        id={inputId}
        className={cn(baseClass, className)}
        {...restField}
        {...inputProps}
        error={error}
        onChange={onChange}
      />
    );
  }

  // input | password (default)
  return (
    <Component
      id={inputId}
      type={type ?? (as === 'password' ? 'password' : 'text')}
      value={value}
      className={cn(
        baseClass,
        error ? 'input-error' : classNameInput,
        className,
      )}
      {...field}
      {...inputProps}
      error={error}
      onChange={onChange}
    />
  );
};

export default InputField;
