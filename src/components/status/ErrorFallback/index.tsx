'use client';

import { useEffect } from 'react';

interface ErrorFallbackProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center pt-10">
      <h2 className="text-center text-xl font-semibold text-red-600">
        Something went wrong!
      </h2>

      <p className="mt-2 text-sm text-gray-500 max-w-md">
        We’re sorry, something went wrong while loading the page. <br />
        Please try again or contact support if the issue continues.
      </p>

      <button
        className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
};

export default ErrorFallback;
