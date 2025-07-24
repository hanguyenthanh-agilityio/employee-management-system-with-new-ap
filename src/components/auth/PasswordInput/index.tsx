import { useState } from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/common/Button/button';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import Input from '@/components/common/Input/input';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const PasswordInput = ({ error, className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'h-auto w-full rounded-md border-2 px-4 py-3 pr-12 !text-lg text-primary shadow-sm',
          error
            ? 'border-red focus:ring-red'
            : 'border-mediumLightGray focus:ring-secondary/30',
          'focus:outline-none focus:ring-2',
          className,
        )}
        {...props}
      />
      <Button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 bg-[none] shadow-none hover:text-gray-700 hover:bg-[none] focus:outline-none"
        onClick={() => setShowPassword((prev) => !prev)}
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeSlashIcon width={20} height={20} />
        ) : (
          <EyeIcon width={20} height={20} />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
