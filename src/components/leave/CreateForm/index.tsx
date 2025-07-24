'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

// Libs
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, differenceInCalendarDays } from 'date-fns';

// APIs
import { createLeaveApplication } from '@/api/leaveApplications';

// Components
import { Form } from '@/components';

// Utils
import {
  LeaveApplicationInput,
  leaveApplicationSchema,
} from '@/utils/schemas/leaveApplicationSchema';

// Constants
import { ROUTER } from '@/constants';
import { getTokenFromCookies } from '@/utils/auth';

const CreateLeaveContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeFromQuery = searchParams.get('type') || undefined;
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<LeaveApplicationInput>({
    resolver: zodResolver(leaveApplicationSchema),
    defaultValues: {
      type: typeFromQuery,
      startDate: '',
      endDate: '',
      durations: 0,
      resumptionDate: '',
      reason: '',
      document: undefined,
    },
  });

  const { watch, setValue, handleSubmit, reset } = form;
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    if (startDate && endDate) {
      const duration =
        differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1;
      if (duration >= 1) {
        setValue('durations', duration);
        setValue(
          'resumptionDate',
          addDays(new Date(endDate), 1).toISOString().split('T')[0],
        );
      }
    }
  }, [startDate, endDate, setValue]);

  const onSubmit = async (data: LeaveApplicationInput) => {
    try {
      setErrorMessage('');

      let uploadedFileId: number | undefined;

      const file = data.document as File;

      if (file) {
        const token = await getTokenFromCookies();

        const formData = new FormData();
        formData.append('files', file);

        const res = await fetch(
          `https://strapi-backend-o8eo.onrender.com/api/upload`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          },
        );

        const data = await res.json();

        uploadedFileId = data?.[0]?.id;
      }

      const payload = {
        ...data,
        document: uploadedFileId,
      };

      const result = await createLeaveApplication(payload);

      if (result.success) {
        router.push(ROUTER.LEAVE_APPLICATION);
        router.refresh();
        reset();
      } else {
        setErrorMessage(result.message || 'Failed to submit leave application');
      }
    } catch (err) {
      setErrorMessage('Something went wrong during submission.');
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form
      data-testid="leave-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Form form={form} onReset={handleReset} />
      {errorMessage && (
        <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
      )}
    </form>
  );
};

export default CreateLeaveContent;
