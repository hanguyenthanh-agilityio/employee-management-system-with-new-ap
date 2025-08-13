'use client';

import { Controller, FieldError, UseFormReturn } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

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

// Styles
import '@/styles/formStyle.css';
import '@/styles/buttonStyle.css';

// Utils
import { cn } from '@/lib/utils';

interface FormProps {
  form: UseFormReturn<LeaveApplicationInput>;
  onReset: () => void;
  defaultDocument?: { name: string; url?: string };
  isLoading?: boolean;
}

const Form = ({ form, onReset, defaultDocument, isLoading }: FormProps) => {
  const {
    control,
    formState: { errors, isSubmitting, isDirty },
  } = form;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isLoadingSubmit = isLoading || isSubmitting;

  const handleReset = () => {
    setPreviewUrl(null);
    onReset?.();
  };

  return (
    <>
      <div>
        <Label className="form-label">Leave Type</Label>
        <p className="form-paragraph">{form.getValues('type') || 'N/A'}</p>
        {form.formState.errors.type?.message && (
          <p className="text-sm text-red font-medium">
            {form.formState.errors.type.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <RequiredLabel htmlFor="startDate" className="form-label">
            Start Date
          </RequiredLabel>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Input
                id="startDate"
                type="date"
                className={cn(
                  'input-base cursor-interactive',
                  errors.startDate ? 'input-error' : 'input-profile',
                )}
                {...field}
                error={errors.startDate?.message}
              />
            )}
          />
        </div>
        <div>
          <RequiredLabel htmlFor="endDate" className="form-label">
            End Date
          </RequiredLabel>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Input
                id="endDate"
                type="date"
                className={cn(
                  'input-base cursor-interactive',
                  errors.endDate ? 'input-error' : 'input-profile',
                )}
                {...field}
                error={errors.endDate?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <RequiredLabel htmlFor="durations" className="form-label">
            Duration (days)
          </RequiredLabel>
          <Controller
            name="durations"
            control={control}
            render={({ field }) => (
              <Input
                id="durations"
                type="number"
                className={cn(
                  'input-base',
                  errors.durations ? 'input-error' : 'input-profile',
                )}
                {...field}
                error={errors.durations?.message}
              />
            )}
          />
        </div>
        <div>
          <RequiredLabel htmlFor="resumptionDate" className="form-label">
            Resumption Date
          </RequiredLabel>
          <Controller
            name="resumptionDate"
            control={control}
            render={({ field }) => (
              <Input
                id="resumptionDate"
                type="date"
                className={cn(
                  'input-base cursor-interactive',
                  errors.resumptionDate ? 'input-error' : 'input-profile',
                )}
                {...field}
                error={errors.resumptionDate?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="pt-4">
        <RequiredLabel htmlFor="reason" className="form-label">
          Reason for Leave
        </RequiredLabel>
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <Textarea
              id="reason"
              className={cn(
                'textarea-base',
                errors.reason ? 'input-error' : 'input-profile',
              )}
              rows={3}
              {...field}
              error={errors.reason?.message}
            />
          )}
        />
      </div>

      <div className="py-5">
        <Label htmlFor="document" className="h-auto form-label">
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
              className="input-file cursor-interactive"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  field.onChange(file);

                  if (file.type.startsWith('image/')) {
                    const objectUrl = URL.createObjectURL(file);
                    setPreviewUrl(objectUrl);
                  } else {
                    setPreviewUrl(null);
                  }
                }
              }}
              error={(errors.document as FieldError)?.message}
            />
          )}
        />

        {previewUrl && (
          <div className="mt-4">
            <Image
              src={previewUrl}
              alt="Document preview"
              width={200}
              height={200}
              className="rounded border border-gray-300 object-contain"
            />
          </div>
        )}

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
          className="btn-primary btn-submit"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="btn-primary btn-reset"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>

      {isLoadingSubmit && <TransitionLoader />}
    </>
  );
};

export default Form;
