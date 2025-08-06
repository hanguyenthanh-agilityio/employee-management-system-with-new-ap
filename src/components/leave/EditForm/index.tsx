'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// APIs
import { updateLeaveApplication } from '@/api/leaveApplications';

// Components
import { Form } from '@/components';

// Constants
import { ERROR_MESSAGE, ROUTER, SUCCESS_MESSAGES } from '@/constants';
import { ALLOWED_LEAVE_TYPES, LeaveType } from '@/constants/inputField';

// Types
import { LeaveItem } from '@/types/components';
import { getDefaultDocument } from '@/types/field';

// Utils
import {
  LeaveApplicationInput,
  leaveApplicationSchema,
} from '@/utils/schemas/leaveApplicationSchema';
import { uploadFileToStrapi } from '@/utils/upload';
interface EditFormProps {
  leave: LeaveItem;
}

const isValidLeaveType = (type: string | null): type is LeaveType =>
  ALLOWED_LEAVE_TYPES.includes(type as LeaveType);

const EditForm = ({ leave }: EditFormProps) => {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const defaultValues = {
    type: isValidLeaveType(leave.type) ? leave.type : undefined,
    startDate: leave.startDate,
    endDate: leave.endDate,
    durations: leave.durations,
    resumptionDate: leave.resumptionDate,
    reason: leave.reason,
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
      let uploadedFileId = leave.document?.id;
      const file = data.document as File;

      if (file instanceof File) {
        uploadedFileId = Number(await uploadFileToStrapi(file));
      }

      const payload = {
        ...data,
        document: uploadedFileId,
      };

      const result = await updateLeaveApplication(leave.documentId, payload);

      if (result.success) {
        toast.success(SUCCESS_MESSAGES.UPDATE_SUCCESS, {
          autoClose: 2000,
          onClose: () => {
            router.push(ROUTER.LEAVE_APPLICATION);
            router.refresh();
          },
        });
        reset(defaultValues);
      } else {
        setErrorMessage(result.message || ERROR_MESSAGE.SUBMIT_LEAVE_FAILED);
      }
    } catch (err) {
      setErrorMessage(ERROR_MESSAGE.UNEXPECTED);
    }
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <>
      <form
        data-testid="edit-form"
        onSubmit={handleSubmit(onSubmit)}
        className="pt-5"
      >
        <Form
          form={form}
          onReset={handleReset}
          defaultDocument={getDefaultDocument(leave?.document)}
        />
      </form>
      {errorMessage && (
        <p className="text-sm text-red font-medium">{errorMessage}</p>
      )}
    </>
  );
};

export default EditForm;
