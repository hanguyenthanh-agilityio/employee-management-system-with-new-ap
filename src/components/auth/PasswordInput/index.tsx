import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';

// Css
import '@/styles/formStyle.css';

// Components
import { Button, Input } from '@/components';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, className, ...props }, _ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative w-full">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'password-input-field',
            error ? 'password-input-error' : 'password-input-normal',
            className,
          )}
          {...props}
        />
        <Button
          type="button"
          className="password-toggle-button bg-[none] hover:bg-[none]"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeSlashIcon data-testid="eye-slash-icon" width={20} height={20} />
          ) : (
            <EyeIcon data-testid="eye-icon" width={20} height={20} />
          )}
        </Button>

        {error && <p className="text-red text-sm mt-2">{error}</p>}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
