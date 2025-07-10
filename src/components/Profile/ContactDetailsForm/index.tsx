import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactDetailsForm = () => {
  return (
    <form className="flex flex-col gap-4 md:gap-8 py-8 md:py-10 px-0 md:px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 w-full">
        <div className="">
          <label htmlFor="phoneNumber1" className="text-xl md:text-2xl">
            Phone Number 1
          </label>
          <Input
            id="phoneNumber1"
            className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
          />
        </div>
        <div className="">
          <label htmlFor="phoneNumber2" className="text-xl md:text-2xl">
            Phone Number 2
          </label>
          <Input
            id="phoneNumber2"
            className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
          />
        </div>
      </div>
      <div className="">
        <label htmlFor="email" className="text-xl md:text-2xl">
          E-mail Address
        </label>
        <Input
          id="email"
          className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
        />
      </div>
      <div className="flex flex-col w-full md:w-[50%] pr-0 md:pr-10">
        <label htmlFor="city" className="text-xl md:text-2xl">
          City of residence
        </label>
        <Input
          id="city"
          className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 py-6 md:py-8 rounded-[15px]"
        />
      </div>
      <div>
        <label htmlFor="residential" className="text-xl md:text-2xl">
          Residential Address
        </label>
        <Textarea
          id="residential"
          rows={4}
          className="my-5 bg-[#E3EDF9] !text-xl border-none p-3 rounded-[15px]"
        />
      </div>

      <Button className="bg-darkGreen text-white hover:bg-green-700 font-bold py-6 md:py-8 text-lg md:text-2xl">
        Update
      </Button>
    </form>
  );
};

export default ContactDetailsForm;
