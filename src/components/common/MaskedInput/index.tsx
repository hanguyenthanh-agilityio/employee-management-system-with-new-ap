'use client';

import InputMask from 'react-input-mask';

import {
  ComponentPropsWithoutRef,
  forwardRef,
  InputHTMLAttributes,
} from 'react';

// Components
import { Input } from '@/components';

interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  error?: string;
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, error, ...props }, ref) => (
    <InputMask mask={mask} maskChar={null} alwaysShowMask={false} {...props}>
      {(inputProps: ComponentPropsWithoutRef<'input'>) => (
        <Input ref={ref} {...inputProps} error={error} />
      )}
    </InputMask>
  ),
);

MaskedInput.displayName = 'MaskedInput';

export default MaskedInput;
