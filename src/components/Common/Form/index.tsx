'use client';

import { UseFormReturn } from 'react-hook-form';

// Components
import { Button, Input } from '@/components';

// Types
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';

interface FormProps {
  form: UseFormReturn<LeaveApplicationInput>;
  onReset: () => void;
}

const Form = ({ form, onReset }: FormProps) => {
  const {
    register,
    formState: { errors, isSubmitting, isDirty },
  } = form;

  return (
    <>
      <div>
        <p className="text-xl md:text-2xl text-[#1D1D1D]">Leave Type</p>
        <p className="my-5 bg-[#E3EDF9] text-xl p-3 rounded-[9px]">
          {form.getValues('type')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          labelClassName="text-xl md:text-2xl text-[#1D1D1D]"
          inputClassName="my-5 bg-[#E3EDF9] text-xl border-none p-3 rounded-[9px]"
          {...register('startDate')}
          error={errors.startDate?.message}
        />
        <Input
          label="End Date"
          type="date"
          labelClassName="text-xl md:text-2xl text-[#1D1D1D]"
          inputClassName="my-5 bg-[#E3EDF9] text-xl border-none p-3 rounded-[9px]"
          {...register('endDate')}
          error={errors.endDate?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Duration (days)"
          type="number"
          labelClassName="text-xl md:text-2xl text-[#1D1D1D]"
          inputClassName="my-5 bg-[#E3EDF9] text-xl border-none p-3 rounded-[9px]"
          {...register('durations')}
          readOnly
          error={errors.durations?.message}
        />
        <Input
          label="Resumption Date"
          type="date"
          labelClassName="text-xl md:text-2xl text-[#1D1D1D]"
          inputClassName="my-5 bg-[#E3EDF9] text-xl border-none p-3 rounded-[9px]"
          {...register('resumptionDate')}
          readOnly
          error={errors.resumptionDate?.message}
        />
      </div>

      <div>
        <p className="text-xl md:text-2xl text-[#1D1D1D]">Reason for Leave</p>
        <textarea
          className="bg-[#E3EDF9] mt-1 block w-full rounded-[9px] border px-4 py-2 text-[25px]"
          rows={2}
          {...register('reason')}
        />
        {errors.reason && <p className="text-red">{errors.reason.message}</p>}
      </div>

      <div className="flex gap-5 py-4">
        <Button
          type="submit"
          customClass="bg-darkGreen hover:bg-green-700 px-10 md:px-28 font-bold"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          type="reset"
          variant="outline"
          customClass="text-red font-bold border-red hover:bg-red-50 border-[3px] border-solid px-10 md:px-28"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </>
  );
};

export default Form;
