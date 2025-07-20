import { Controller, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/Common/Button/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/Common/Textarea/textarea';
import { Label } from '@/components/Common/Label/label';

// Utils
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';

interface ContactDetailsFormProps {
  form: UseFormReturn<ContactDetailsInput>;
  disable: boolean;
}

const ContactDetailsForm = ({ form, disable }: ContactDetailsFormProps) => {
  const {
    control,
    formState: { errors, isDirty, isSubmitting },
  } = form;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 w-full">
        <div>
          <Label htmlFor="mainPhoneNumber" className="text-xl md:text-2xl">
            Phone Number 1
          </Label>
          <Controller
            name="mainPhoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="mainPhoneNumber"
                className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
                disabled={disable}
                error={errors.mainPhoneNumber?.message}
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="subPhoneNumber" className="text-xl md:text-2xl">
            Phone Number 2
          </Label>
          <Controller
            name="subPhoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="subPhoneNumber"
                className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
                disabled={disable}
                error={errors.subPhoneNumber?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email" className="text-xl md:text-2xl">
          E-mail Address
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              id="email"
              className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
              disabled={disable}
              error={errors.email?.message}
              {...field}
            />
          )}
        />
      </div>
      <div className="flex flex-col w-full md:w-[50%] pr-0 md:pr-10">
        <Label htmlFor="city" className="text-xl md:text-2xl">
          City of residence
        </Label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input
              id="city"
              className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
              disabled={disable}
              error={errors.city?.message}
              {...field}
            />
          )}
        />
      </div>
      <div>
        <Label htmlFor="residential" className="text-xl md:text-2xl">
          Residential Address
        </Label>
        <Controller
          name="residential"
          control={control}
          render={({ field }) => (
            <Textarea
              id="residential"
              rows={4}
              className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[15px]"
              disabled={disable}
              error={errors.residential?.message}
              {...field}
            />
          )}
        />
      </div>

      <Button
        className="bg-darkGreen text-white hover:bg-green-700 font-bold py-6 md:py-8 text-lg md:text-2xl"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </>
  );
};

export default ContactDetailsForm;
