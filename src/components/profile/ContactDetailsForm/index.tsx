'use client';

import '@/styles/formStyle.css';
import { UseFormReturn } from 'react-hook-form';

// Components
import { Button } from '@/components';

// Utils
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';
import { FieldConfig } from '@/types/field';

import { withValidation } from '@/utils/withValidation';
import { InputField } from '@/components/common/forms/InputField';
import {
  TextareaField,
  TextareaFieldProps,
} from '@/components/common/forms/TextareaField';
import {
  MaskedInputField,
  MaskedInputFieldProps,
} from '@/components/common/forms/MaskInputField';
import { InputFieldType } from '@/types/form';

interface ContactDetailsFormProps {
  form: UseFormReturn<ContactDetailsInput>;
  fields: FieldConfig<ContactDetailsInput>[];

  disable: boolean;
}

// Validated fields
const ValidatedInputField = withValidation<
  ContactDetailsInput,
  HTMLInputElement,
  InputFieldType
>(InputField);

const ValidatedTextareaField = withValidation<
  ContactDetailsInput,
  HTMLTextAreaElement,
  TextareaFieldProps
>(TextareaField);

const ValidatedMaskedInputField = withValidation<
  ContactDetailsInput,
  HTMLInputElement,
  MaskedInputFieldProps
>(MaskedInputField);

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
                  componentProps={{
                    label: field.label,
                    required: field.required,
                    rows: 4,
                    disabled: disable,
                  }}
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
                  componentProps={{
                    label: field.label,
                    required: field.required,
                    mask: field.mask!,
                    disabled: disable,
                  }}
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
                componentProps={{
                  label: field.label,
                  required: field.required,
                  type: field.type,
                  readOnly: field.readOnly,
                  disabled: disable,
                }}
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
