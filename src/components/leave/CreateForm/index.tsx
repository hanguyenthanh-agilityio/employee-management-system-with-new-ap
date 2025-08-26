'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRouter, useSearchParams } from 'next/navigation';

// Libs
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, differenceInCalendarDays } from 'date-fns';

// APIs
import { createLeaveApplication } from '@/actions/leaveApplications';

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
import {
  ALLOWED_LEAVE_TYPES,
  leaveFormFields,
  LeaveType,
} from '@/constants/inputField';
import { ServerError, UserError } from '@/utils/error';

const isValidLeaveType = (type: string | null): type is LeaveType =>
  ALLOWED_LEAVE_TYPES.includes(type as LeaveType);

const CreateLeaveForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryType = searchParams.get('type');
  const typeFromQuery: LeaveType | undefined = isValidLeaveType(queryType)
    ? queryType
    : undefined;

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
    mode: 'onChange',
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

      await createLeaveApplication(payload);

      toast.success(SUCCESS_MESSAGES.CREATE_SUCCESS, {
        autoClose: 2000,
        onClose: () => {
          router.push(ROUTER.LEAVE_APPLICATION);
          router.refresh();
        },
      });
      reset(payload);
    } catch (err) {
      // Distinguish between user and server errors
      if (err instanceof UserError) {
        // display toast right on the form
        toast.error(err.message);
      } else if (err instanceof ServerError) {
        // display ErrorPage
        throw err;
      } else {
        throw new ServerError(ERROR_MESSAGE.UNEXPECTED, 500);
      }
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
        <Form
          fields={leaveFormFields}
          form={form}
          onReset={handleReset}
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default CreateLeaveForm;
