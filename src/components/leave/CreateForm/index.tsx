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
  ALLOWED_LEAVE_TYPES,
  LeaveApplicationInput,
  leaveApplicationSchema,
} from '@/utils/schemas/leaveApplicationSchema';
import { uploadFileToStrapi } from '@/utils/upload';

// Constants
import { ERROR_MESSAGE, ROUTER } from '@/constants';

type LeaveType = (typeof ALLOWED_LEAVE_TYPES)[number];

const CreateLeaveContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeFromQuery = searchParams.get('type');
  const leaveType: LeaveType | undefined = ALLOWED_LEAVE_TYPES.includes(
    typeFromQuery as LeaveType,
  )
    ? (typeFromQuery as LeaveType)
    : undefined;

  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<LeaveApplicationInput>({
    resolver: zodResolver(leaveApplicationSchema),
    defaultValues: {
      type: leaveType,
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
        const fileId = await uploadFileToStrapi(file);
        uploadedFileId = fileId ? Number(fileId) : undefined;
      }

      const payload = {
        ...data,
        document: uploadedFileId ?? undefined,
      };

      const result = await createLeaveApplication(payload);

      if (result.success) {
        router.push(ROUTER.LEAVE_APPLICATION);
        router.refresh();
        reset();
      } else {
        setErrorMessage(result.message || ERROR_MESSAGE.SUBMIT_LEAVE_FAILED);
      }
    } catch (err) {
      setErrorMessage(ERROR_MESSAGE.UNEXPECTED);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <form
        data-testid="leave-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Form form={form} onReset={handleReset} />
      </form>
      {errorMessage && (
        <p className="text-sm text-red font-medium">{errorMessage}</p>
      )}
    </>
  );
};

export default CreateLeaveContent;
