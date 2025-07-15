'use client';

import { UseFormReturn } from 'react-hook-form';

// Components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Types
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';

interface FormProps {
  form: UseFormReturn<LeaveApplicationInput>;
  onReset: () => void;
}

const Form = ({ form, onReset }: FormProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <>
      <div>
        <Label className="text-xl md:text-2xl text-[#1D1D1D]">Leave Type</Label>
        <p className="my-5 bg-[#E3EDF9] text-xl p-3 rounded-[9px]">
          {form.getValues('type')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="startDate"
            className="text-xl md:text-2xl text-[#1D1D1D]"
          >
            Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            className="h-auto my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[9px]"
            {...register('startDate')}
            error={errors.startDate?.message}
          />
        </div>
        <div>
          <Label className="text-xl md:text-2xl text-[#1D1D1D]">End Date</Label>
          <Input
            id="endDate"
            type="date"
            className="h-auto my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[9px]"
            {...register('endDate')}
            error={errors.endDate?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="durations"
            className="text-xl md:text-2xl text-[#1D1D1D]"
          >
            Duration (days)
          </Label>
          <Input
            id="durations"
            type="number"
            className="h-auto my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[9px]"
            {...register('durations')}
            readOnly
            error={errors.durations?.message}
          />
        </div>
        <div>
          <Label
            htmlFor="resumptionDate"
            className="text-xl md:text-2xl text-[#1D1D1D]"
          >
            Resumption Date
          </Label>
          <Input
            id="resumptionDate"
            type="date"
            className="h-auto my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[9px]"
            {...register('resumptionDate')}
            readOnly
            error={errors.resumptionDate?.message}
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="reasonLeave"
          className="text-xl md:text-2xl text-[#1D1D1D]"
        >
          Reason for Leave
        </Label>
        <Textarea
          id="reasonLeave"
          className="bg-[#E3EDF9] !text-xl mt-1 block w-full rounded-[9px] border px-4 py-2 text-[25px]"
          rows={3}
          {...register('reason')}
        />
        {errors.reason && <p className="text-red">{errors.reason.message}</p>}
      </div>

      <div className="py-5">
        <Label
          htmlFor="reasonLeave"
          className="h-auto text-xl md:text-2xl text-[#1D1D1D]"
        >
          Attach handover document (pdf, jpg, docx or any other format)
        </Label>
        <Input
          id="document"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="h-auto bg-[#E3EDF9] mt-2 block w-full text-sm border-none file:rounded-md file:border-0 file:bg-[#242121] file:px-4 file:py-4 file:text-white hover:file:bg-blue-700"
          {...register('document')}
        />
      </div>

      <div className="flex gap-5 py-4">
        <Button
          type="submit"
          className="bg-darkGreen hover:bg-green-700 px-10 md:px-28 py-6 font-bold text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="text-red font-bold border-red hover:bg-red-50 border-[3px] border-solid px-10 md:px-28 py-5"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </>
  );
};

export default Form;
