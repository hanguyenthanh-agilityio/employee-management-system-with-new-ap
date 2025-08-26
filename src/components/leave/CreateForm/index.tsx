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
import { ROUTER } from '@/constants';
import {
  ALLOWED_LEAVE_TYPES,
  leaveFormFields,
  LeaveType,
} from '@/constants/inputField';

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

      const payload = { ...data, document: uploadedFileId ?? undefined };
      const res = await createLeaveApplication(payload);

      if (!res.success) {
        if (res.isUserError) {
          toast.error(res.message || 'Please login again', { autoClose: 2000 });

          if (res.status === 401) {
            setTimeout(() => {
              router.push('/login');
            }, 2000);
          }
          return;
        }

        // Server error
        toast.error(res.message ?? 'Unexpected server error');
        return;
      }

      // Success
      toast.success('Leave application created successfully', {
        autoClose: 2000,
        onClose: () => {
          setTimeout(() => {
            router.push(ROUTER.LEAVE_APPLICATION);
            router.refresh();
          }, 2000);
        },
      });

      reset(payload);
    } finally {
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
