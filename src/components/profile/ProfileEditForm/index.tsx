'use client';

import { UseFormReturn } from 'react-hook-form';

// Components
import { Button, TransitionLoader } from '@/components';

// Types
import { PersonalDetailsInput } from '@/utils/schemas/updateProfile';
import { FieldConfig } from '@/types/field';
import { withValidation } from '@/utils/withValidation';
import { InputField } from '@/components/common/forms/InputField';
import { InputFieldType } from '@/types/form';

interface ProfileEditFormProps {
  form: UseFormReturn<PersonalDetailsInput>;
  fields: FieldConfig<PersonalDetailsInput>[];
}

const ValidatedInputField = withValidation<
  PersonalDetailsInput,
  HTMLInputElement,
  InputFieldType
>(InputField);

const ProfileEditForm = ({ form, fields }: ProfileEditFormProps) => {
  const {
    control,
    formState: { isSubmitting, isDirty },
  } = form;

  return (
    <>
      {isSubmitting && <TransitionLoader />}

      {/* Dynamic fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {fields.map((field) => (
          <div key={field.name} className={`col-span-${field.colSpan ?? 1}`}>
            <ValidatedInputField
              control={control}
              name={field.name}
              componentProps={{
                label: field.label,
                required: field.required,
                type: field.type,
                readOnly: field.readOnly,
              }}
            />
          </div>
        ))}
      </div>

      {/* Save button */}
      <Button
        type="submit"
        className="w-full btn-primary btn-submit disabled:opacity-50 transition text-xl"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </>
  );
};

export default ProfileEditForm;
