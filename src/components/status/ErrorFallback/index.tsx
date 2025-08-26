'use client';

import { ServerError } from '@/utils/error';
import { useEffect } from 'react';

interface ErrorFallbackProps {
  error: Error & { status?: number; digest?: string };
  reset: () => void;
}

/**
 * Component displayed when server or unexpected error occurs
 * - Display status code if any
 * - Display clear message
 * - Log error to console for dev to debug
 * - Allow user to retry
 */
const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // If error is ServerError, show status and message
  const status = error.status ?? 500;
  const message =
    error instanceof ServerError
      ? error.message
      : 'Something went wrong. Please try again later.';

  return (
    <main className="flex h-full flex-col items-center justify-center pt-10 px-4">
      <h1 className="text-6xl font-bold text-red-600">{status}</h1>
      <h2 className="text-center text-xl font-semibold text-red-600 mt-2">
        {message}
      </h2>

      <p className="mt-4 text-sm text-gray-500 max-w-md text-center">
        We’re sorry, something went wrong while loading the page.
        <br />
        Please try again or contact support if the issue continues.
      </p>

      <button
        className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={reset}
      >
        Try Again
      </button>
    </main>
  );
};

export default ErrorFallback;
