'use client';

import { useEffect } from 'react';
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

// Services
import { uploadFile } from '@/services/apiService';

const CreateLeaveContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeFromQuery = searchParams.get('type') || undefined;

  const form = useForm<LeaveApplicationInput>({
    resolver: zodResolver(leaveApplicationSchema),
    defaultValues: {
      type: typeFromQuery,
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
      console.log('onSubmit', data);

      const file = form.getValues('document')?.[0];

      let uploadedDocId: string | undefined = undefined;

      if (file) {
        const uploaded = await uploadFile(file);
        uploadedDocId = uploaded.id;
      }

      const result = await createLeaveApplication({
        ...data,
        document: uploadedDocId,
      });
      if (result.success) {
        router.push(ROUTER.LEAVE_APPLICATION);
        router.refresh(); //re-search
        reset();
      }
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Unknown error',
      };
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
    </form>
  );
};

export default CreateLeaveContent;
