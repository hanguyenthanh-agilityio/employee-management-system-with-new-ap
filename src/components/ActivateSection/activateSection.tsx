'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

// Icons
import { CheckCircleIcon } from '@heroicons/react/24/outline';

// Components
import { Button } from '@/components';

// Actions
import { activateAction } from '@/actions/auth-action';

// Constants
import { ROUTER } from '@/constants';

const ActivateSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get UID and token from URL
  const uid = searchParams.get('uidb64') || '';
  const token = searchParams.get('token') || '';

  // Loading state when call api
  const [loading, setLoading] = useState(false);

  // Successful or not
  const [success, setSuccess] = useState(false);

  // Message for error or success
  const [message, setMessage] = useState('');

  // Handle click activate button
  const handleActivate = async () => {
    if (!uid || !token) {
      setMessage('Missing activation credentials.');
      return;
    }

    setLoading(true);
    try {
      const result = await activateAction({ uid, token });
      setSuccess(result.success);
      setMessage(result.message);

      if (result.success) {
        setTimeout(() => router.push(ROUTER.LOGIN), 3000);
      }
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : 'Unknown activation error',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <CheckCircleIcon className="w-12 h-12" />
        <h1 className="text-2xl font-bold">Activate your account</h1>
      </div>
      <p className="text-xl mt-8">Click the button below to confirm</p>
      <Button
        onClick={handleActivate}
        disabled={loading || success}
        customClass="flex justify-center items-center w-[150px] h-[54px] text-xl mt-4 py-3 rounded-xl"
      >
        {loading ? 'ACTIVATING...' : 'ACTIVATE'}
      </Button>
      {message && (
        <p
          className={`mt-4 text-xl ${
            success ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ActivateSection;
