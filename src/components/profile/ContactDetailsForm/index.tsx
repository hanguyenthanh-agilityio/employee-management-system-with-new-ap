'use client';

import '@/styles/formStyle.css';
import { UseFormReturn } from 'react-hook-form';

// Components
import { Button } from '@/components';

// Utils
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';
import { FieldConfig } from '@/types/field';
import ValidatedTextareaField from '@/components/common/forms/ValidatedTextareaField';
import ValidatedMaskedInputField from '@/components/common/forms/ValidatedMaskedInputField';
import ValidatedInputField from '@/components/common/forms/ValidatedInputField';

interface ContactDetailsFormProps {
  form: UseFormReturn<ContactDetailsInput>;
  fields: FieldConfig<ContactDetailsInput>[];

  disable: boolean;
}

const ContactDetailsForm = ({
  form,
  fields,
  disable,
}: ContactDetailsFormProps) => {
  const {
    control,
    formState: { isSubmitting, isDirty },
  } = form;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
        {fields.map((field) => {
          if (field.type === 'textarea') {
            return (
              <div
                key={field.name as string}
                className={`col-span-${field.colSpan ?? 2}`}
              >
                <ValidatedTextareaField
                  control={control}
                  name={field.name}
                  label={field.label}
                  required={field.required}
                  disabled={disable}
                  rows={4}
                />
              </div>
            );
          }

          if (field.type === 'masked') {
            return (
              <div
                key={field.name as string}
                className={`col-span-${field.colSpan ?? 1}`}
              >
                <ValidatedMaskedInputField
                  control={control}
                  name={field.name}
                  label={field.label}
                  required={field.required}
                  disabled={disable}
                  mask={field.mask!}
                />
              </div>
            );
          }

          return (
            <div
              key={field.name as string}
              className={`col-span-${field.colSpan ?? 1}`}
            >
              <ValidatedInputField
                control={control}
                name={field.name}
                label={field.label}
                required={field.required}
                disabled={disable}
              />
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <Button
        className="btn-primary btn-submit disabled:opacity-50 transition text-xl mt-6"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </>
  );
};

export default ContactDetailsForm;
