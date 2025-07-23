'use client';

// Types
import { PageErrorProps } from '@/types/components';

// Components
import { Button } from '@/components';

export default function GlobalError({
  // error,
  reset,
}: PageErrorProps) {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <Button
          className="bg-rose-500 text-white hover:bg-rose-600 disabled:bg-rose-300"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </body>
    </html>
  );
}
