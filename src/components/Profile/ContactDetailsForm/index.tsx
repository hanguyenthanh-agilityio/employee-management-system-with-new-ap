import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Utils
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';

interface ContactDetailsFormProps {
  form: UseFormReturn<ContactDetailsInput>;
}

const ContactDetailsForm = ({ form }: ContactDetailsFormProps) => {
  const {
    register,
    formState: { errors, isDirty, isSubmitting },
  } = form;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 w-full">
        <div>
          <Label htmlFor="phoneNumber1" className="text-xl md:text-2xl">
            Phone Number 1
          </Label>
          <Input
            id="phoneNumber1"
            className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
            {...register('phoneNumber1')}
            error={errors.phoneNumber1?.message}
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber2" className="text-xl md:text-2xl">
            Phone Number 2
          </Label>
          <Input
            id="phoneNumber2"
            className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
            {...register('phoneNumber2')}
            error={errors.phoneNumber2?.message}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email" className="text-xl md:text-2xl">
          E-mail Address
        </Label>
        <Input
          id="email"
          className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>
      <div className="flex flex-col w-full md:w-[50%] pr-0 md:pr-10">
        <Label htmlFor="city" className="text-xl md:text-2xl">
          City of residence
        </Label>
        <Input
          id="city"
          className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
          {...register('city')}
          error={errors.city?.message}
        />
      </div>
      <div>
        <Label htmlFor="residential" className="text-xl md:text-2xl">
          Residential Address
        </Label>
        <Textarea
          id="residential"
          rows={4}
          className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[15px]"
          {...register('residential')}
          error={errors.residential?.message}
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
