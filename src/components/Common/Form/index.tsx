'use client';

import { Controller, FieldError, UseFormReturn } from 'react-hook-form';
import Link from 'next/link';

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
  defaultDocument?: { name: string; url?: string };
}

const Form = ({ form, onReset, defaultDocument }: FormProps) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <>
      <div>
        <Label className="text-xl md:text-2xl text-[#1D1D1D]">Leave Type</Label>
        <p className="mt-5 mb-11 bg-[#E3EDF9] text-xl p-3 rounded-[9px]">
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
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Input
                id="startDate"
                type="date"
                className="h-auto my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[9px]"
                {...field}
                error={errors.startDate?.message}
              />
            )}
          />
        </div>
        <div>
          <Label className="text-xl md:text-2xl text-[#1D1D1D]">End Date</Label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Input
                id="endDate"
                type="date"
                className="h-auto my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[9px]"
                {...field}
                error={errors.endDate?.message}
              />
            )}
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
          <Controller
            name="durations"
            control={control}
            render={({ field }) => (
              <Input
                id="durations"
                type="number"
                className="h-auto my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[9px]"
                {...field}
                error={errors.durations?.message}
              />
            )}
          />
        </div>
        <div>
          <Label
            htmlFor="resumptionDate"
            className="text-xl md:text-2xl text-[#1D1D1D]"
          >
            Resumption Date
          </Label>
          <Controller
            name="resumptionDate"
            control={control}
            render={({ field }) => (
              <Input
                id="resumptionDate"
                type="date"
                className="h-auto my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[9px]"
                {...field}
                error={errors.resumptionDate?.message}
              />
            )}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="reason" className="text-xl md:text-2xl text-[#1D1D1D]">
          Reason for Leave
        </Label>
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <Textarea
              id="reason"
              className="bg-[#E3EDF9] !text-xl mt-5 block w-full rounded-[9px] border px-4 py-2 text-[25px]"
              rows={3}
              {...field}
              error={errors.reason?.message}
            />
          )}
        />
      </div>

      <div className="py-5">
        <Label
          htmlFor="document"
          className="h-auto text-xl md:text-2xl text-[#1D1D1D]"
        >
          Attach handover document (pdf, jpg, docx or any other format)
        </Label>
        <Controller
          name="document"
          control={control}
          render={({ field }) => (
            <Input
              id="document"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="h-auto bg-[#E3EDF9] mt-5 block w-full text-sm border-none file:rounded-md file:border-0 file:bg-[#242121] file:px-4 file:py-4 file:text-white hover:file:bg-blue-700"
              {...field}
              error={(errors.document as FieldError)?.message}
            />
          )}
        />
        {defaultDocument?.url && (
          <div className="mt-4 flex items-center gap-3 text-base text-[#1D1D1D]">
            <Link
              href={defaultDocument.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-400"
            >
              📎 {defaultDocument.name}
            </Link>
            <span className="text-sm text-gray-500">(Uploaded)</span>
          </div>
        )}
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
