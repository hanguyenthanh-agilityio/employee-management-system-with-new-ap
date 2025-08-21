'use client';

import { UseFormReturn } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

// Components
import { Label, Button, TransitionLoader } from '@/components';
import ValidatedInputField from '../ValidatedInputField';
import ValidatedTextareaField from '../ValidatedTextareaField';
import ValidatedFileInputField from '../ValidatedFileInputField';

// Types
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';

// Styles
import '@/styles/formStyle.css';
import '@/styles/buttonStyle.css';
import { FieldConfig } from '@/types/field';

interface FormProps {
  form: UseFormReturn<LeaveApplicationInput>;
  fields: FieldConfig[];
  onReset: () => void;
  defaultDocument?: { name: string; url?: string };
  isLoading?: boolean;
}

const Form = ({
  form,
  onReset,
  fields,
  defaultDocument,
  isLoading,
}: FormProps) => {
  const {
    control,
    formState: { isSubmitting, isDirty },
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

      {/* Dynamic fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {fields.map((field) =>
          field.type === 'textarea' ? (
            <div key={field.name} className={`col-span-${field.colSpan ?? 2}`}>
              <ValidatedTextareaField
                control={control}
                name={field.name}
                label={field.label}
                required={field.required}
                rows={3}
              />
            </div>
          ) : (
            <div key={field.name} className={`col-span-${field.colSpan ?? 1}`}>
              <ValidatedInputField
                control={control}
                name={field.name}
                label={field.label}
                required={field.required}
                type={field.type}
                readOnly={field.readOnly}
              />
            </div>
          ),
        )}
      </div>

      <div className="py-5">
        <ValidatedFileInputField
          control={control}
          name="document"
          required={false}
          label="Attach handover document (pdf, jpg, docx or any other format)"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onFileChange={(file) => {
            if (file && file.type.startsWith('image/')) {
              const objectUrl = URL.createObjectURL(file);
              setPreviewUrl(objectUrl);
            } else {
              setPreviewUrl(null);
            }
          }}
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
