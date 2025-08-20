import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import Button from '../../ui/Button/button';

interface InputProps extends React.ComponentProps<'input'> {
  error?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, onIconClick, name, ...props }, ref) => (
    <>
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
      {icon && (
        <Button
          type="button"
          tabIndex={-1}
          onClick={onIconClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {icon}
        </Button>
      )}
      {error && (
        <p className="text-red text-sm mt-1" data-testid={`${name}-error`}>
          {error}
        </p>
      )}
    </>
  ),
);
Input.displayName = 'Input';

export { Input };

export default Input;
