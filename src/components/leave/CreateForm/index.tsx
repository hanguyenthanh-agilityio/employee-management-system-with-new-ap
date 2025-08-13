'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
import { uploadFileToStrapi } from '@/utils/upload';

// Constants
import { ERROR_MESSAGE, ROUTER, SUCCESS_MESSAGES } from '@/constants';
import { ALLOWED_LEAVE_TYPES, LeaveType } from '@/constants/inputField';

const isValidLeaveType = (type: string | null): type is LeaveType =>
  ALLOWED_LEAVE_TYPES.includes(type as LeaveType);

const CreateLeaveForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryType = searchParams.get('type');
  const typeFromQuery: LeaveType | undefined = isValidLeaveType(queryType)
    ? queryType
    : undefined;
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    type: typeFromQuery,
    startDate: '',
    endDate: '',
    durations: 0,
    resumptionDate: '',
    reason: '',
    document: undefined,
  };

  const form = useForm<LeaveApplicationInput>({
    resolver: zodResolver(leaveApplicationSchema),
    defaultValues,
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
      setIsLoading(true);

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
        toast.success(SUCCESS_MESSAGES.CREATE_SUCCESS, {
          autoClose: 2000,
          onClose: () => {
            router.push(ROUTER.LEAVE_APPLICATION);
            router.refresh();
          },
        });
        reset(payload);
      } else {
        setErrorMessage(result.message || ERROR_MESSAGE.SUBMIT_LEAVE_FAILED);
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMessage(ERROR_MESSAGE.UNEXPECTED);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <>
      <form
        data-testid="leave-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Form form={form} onReset={handleReset} isLoading={isLoading} />
      </form>
      {errorMessage && (
        <p className="text-sm text-red font-medium">{errorMessage}</p>
      )}
    </>
  );
};

export default CreateLeaveForm;
