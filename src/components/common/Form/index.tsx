'use client';

import { Controller, FieldError, UseFormReturn } from 'react-hook-form';
import Link from 'next/link';

// Components
import {
  Input,
  Label,
  Textarea,
  Button,
  RequiredLabel,
  TransitionLoader,
} from '@/components';

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
    formState: { errors, isSubmitting, isDirty },
  } = form;

  return (
    <>
      <div>
        <Label className="text-xl md:text-2xl text-[#1D1D1D] dark:text-slate-300">
          Leave Type
        </Label>
        <p className="mt-5 mb-2 bg-[#E3EDF9] dark:bg-darkPrimary text-xl p-3 rounded-[9px]">
          {form.getValues('type') || 'N/A'}
        </p>
        {form.formState.errors.type?.message && (
          <p className="text-sm text-red font-medium">
            {form.formState.errors.type.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <RequiredLabel
            htmlFor="startDate"
            className="text-xl md:text-2xl text-[#1D1D1D] dark:text-slate-300"
          >
            Start Date
          </RequiredLabel>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Input
                id="startDate"
                type="date"
                className="h-auto my-5 bg-[#E3EDF9] dark:bg-darkPrimary !text-xl border-none p-3 rounded-[9px]"
                {...field}
                error={errors.startDate?.message}
              />
            )}
          />
        </div>
        <div>
          <RequiredLabel
            htmlFor="endDate"
            className="text-xl md:text-2xl text-[#1D1D1D] dark:text-slate-300"
          >
            End Date
          </RequiredLabel>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Input
                id="endDate"
                type="date"
                className="h-auto my-5 bg-[#E3EDF9] dark:bg-darkPrimary !text-xl border-none p-3 rounded-[9px]"
                {...field}
                error={errors.endDate?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <RequiredLabel
            htmlFor="durations"
            className="text-xl md:text-2xl text-[#1D1D1D] dark:text-slate-300"
          >
            Duration (days)
          </RequiredLabel>
          <Controller
            name="durations"
            control={control}
            render={({ field }) => (
              <Input
                id="durations"
                type="number"
                className="h-auto my-5 bg-[#E3EDF9] dark:bg-darkPrimary !text-xl border-none p-3 rounded-[9px]"
                {...field}
                error={errors.durations?.message}
              />
            )}
          />
        </div>
        <div>
          <RequiredLabel
            htmlFor="resumptionDate"
            className="text-xl md:text-2xl text-[#1D1D1D] dark:text-slate-300"
          >
            Resumption Date
          </RequiredLabel>
          <Controller
            name="resumptionDate"
            control={control}
            render={({ field }) => (
              <Input
                id="resumptionDate"
                type="date"
                className="h-auto my-5 bg-[#E3EDF9] dark:bg-darkPrimary !text-xl border-none p-3 rounded-[9px]"
                {...field}
                error={errors.resumptionDate?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="pt-4">
        <RequiredLabel
          htmlFor="reason"
          className="text-xl md:text-2xl text-[#1D1D1D] dark:text-slate-300"
        >
          Reason for Leave
        </RequiredLabel>
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <Textarea
              id="reason"
              className="bg-[#E3EDF9] dark:bg-darkPrimary dark:text-white !text-xl mt-5 block w-full rounded-[9px] border px-4 py-2 text-[25px]"
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
          className="h-auto text-xl md:text-2xl text-[#1D1D1D] dark:text-slate-300"
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
              className="h-auto bg-[#E3EDF9] dark:bg-darkPrimary mt-5 block w-full text-sm border-none file:rounded-md file:border-0 file:bg-[#242121] file:px-4 file:py-4 file:text-white hover:file:bg-blue-700"
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
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
          className="bg-darkGreen hover:bg-green-700 px-10 md:px-28 py-6 font-bold text-white dark:bg-green-500 dark:hover:bg-green-400"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="text-red-600 dark:border-red-400 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 font-bold border-[#b30000] hover:bg-red-50 border-[3px] border-solid px-10 md:px-28 py-5"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>

      {isSubmitting && <TransitionLoader />}
    </>
  );
};

export default Form;
