'use client';

import { updateLeaveApplication } from '@/api/leaveApplications';
import Form from '@/components/Common/Form';
import { ROUTER } from '@/constants';
import { LeaveItem } from '@/types/components';
import {
  LeaveApplicationInput,
  leaveApplicationSchema,
} from '@/utils/schemas/leaveApplicationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface EditFormProps {
  leave: LeaveItem;
}

const EditForm = ({ leave }: EditFormProps) => {
  const router = useRouter();

  const form = useForm<LeaveApplicationInput>({
    resolver: zodResolver(leaveApplicationSchema),
    defaultValues: {
      type: leave.type,
      startDate: leave.startDate,
      endDate: leave.endDate,
      durations: leave.durations,
      resumptionDate: leave.resumptionDate,
      reason: leave.reason,
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
    await updateLeaveApplication(leave.documentId, data);

    router.push(ROUTER.LEAVE_APPLICATION);

    reset(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
      <Form form={form} onReset={handleReset} />
    </form>
  );
};

export default EditForm;
