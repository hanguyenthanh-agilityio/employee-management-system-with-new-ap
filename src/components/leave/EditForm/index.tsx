'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// APIs
import { updateLeaveApplication } from '@/actions/leaveApplications';

// Components
import { Form } from '@/components';

// Constants
import { ERROR_MESSAGE, ROUTER, SUCCESS_MESSAGES } from '@/constants';
import {
  ALLOWED_LEAVE_TYPES,
  leaveFormFields,
  LeaveType,
} from '@/constants/inputField';

// Types
import { LeaveItem } from '@/types/components';
import { getDefaultDocument } from '@/types/field';

// Utils
import {
  LeaveApplicationInput,
  leaveApplicationSchema,
} from '@/utils/schemas/leaveApplicationSchema';
import { uploadFileToStrapi } from '@/utils/upload';
import { ServerError, UserError } from '@/utils/error';

interface EditFormProps {
  leave: LeaveItem;
}

const isValidLeaveType = (type: string | null): type is LeaveType =>
  ALLOWED_LEAVE_TYPES.includes(type as LeaveType);

const EditForm = ({ leave }: EditFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const defaultValues = {
    type: isValidLeaveType(leave.type) ? leave.type : undefined,
    startDate: leave.startDate || '',
    endDate: leave.endDate || '',
    durations: leave.durations || 0,
    resumptionDate: leave.resumptionDate || '',
    reason: leave.reason || '',
    document: null,
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
      setIsLoading(true);

      let uploadedFileId = leave.document?.id;
      const file = data.document as File;

      if (file instanceof File) {
        uploadedFileId = Number(await uploadFileToStrapi(file));
      }

      const payload = {
        ...data,
        document: uploadedFileId,
      };

      await updateLeaveApplication(leave.documentId, payload);

      toast.success(SUCCESS_MESSAGES.UPDATE_SUCCESS, {
        autoClose: 2000,
        onClose: () => {
          router.push(ROUTER.LEAVE_APPLICATION);
          router.refresh();
        },
      });
      reset(payload);
    } catch (err) {
      if (err instanceof UserError) {
        toast.error(err.message);
      } else if (err instanceof ServerError) {
        throw err;
      } else {
        throw new Error(ERROR_MESSAGE.UNEXPECTED);
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
        data-testid="edit-form"
        onSubmit={handleSubmit(onSubmit)}
        className="pt-5"
      >
        <Form
          fields={leaveFormFields}
          form={form}
          onReset={handleReset}
          defaultDocument={getDefaultDocument(leave?.document)}
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default EditForm;
