'use client';

import { useRouter, useSearchParams } from 'next/navigation';

// Icons
import { BookOpenIcon } from '@heroicons/react/16/solid';

// APIs

// Components
import { Breadcrumbs, Form } from '@/components';
import { useForm } from 'react-hook-form';
import {
  LeaveApplicationInput,
  leaveApplicationSchema,
} from '@/utils/schemas/leaveApplicationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { ROUTER } from '@/constants';
import { createLeaveApplication } from '@/api/leaveApplications';

const CreateLeavePage = () => {
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
      const result = await createLeaveApplication(data);

      if (result.success) {
        router.push(ROUTER.LEAVE_APPLICATION);
        router.refresh();
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <Breadcrumbs paths={['Leave Applications', 'Annual Leave']} />
      <div className="w-full max-w-screen-lg mx-auto bg-white px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-10 lg:py-14 shadow-md">
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 flex items-center justify-center gap-3">
            <BookOpenIcon className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
            Leave Application
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700">
            Fill the required fields below to apply for leave.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Form
            form={form}
            onReset={handleReset}
            isSubmitting={form.formState.isSubmitting}
            isDirty={true}
          />
        </form>
      </div>
    </>
  );
};

export default CreateLeavePage;
