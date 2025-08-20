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
  field: Record<string, unknown>;
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
  field,
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

  // textarea
  if (as === 'textarea') {
    return (
      <Component
        id={name}
        rows={rows ?? 3}
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
        id={name}
        mask={mask}
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
    return (
      <Component
        id={name}
        className={cn(baseClass, className)}
        {...field}
        {...inputProps}
        error={error}
        onChange={onChange}
      />
    );
  }

  // input | password (default)
  return (
    <Component
      id={name}
      type={type ?? (as === 'password' ? 'password' : 'text')}
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
