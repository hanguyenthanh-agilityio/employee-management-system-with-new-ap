'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// types
import { ContactsDetailsType } from '@/types/profile';

// Components
import { ContactDetailsForm } from '@/components';

// Utils
import {
  contactDetails,
  ContactDetailsInput,
} from '@/utils/schemas/updateProfile';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/services/apiService';

interface ContactDetailsSectionProps {
  contact: ContactsDetailsType;
  userId: number;
}

const ContactDetailsSection = ({
  contact,
  userId,
}: ContactDetailsSectionProps) => {
  const form = useForm<ContactDetailsInput>({
    resolver: zodResolver(contactDetails),
    defaultValues: {
      phoneNumber1: contact.phoneNumber1,
      phoneNumber2: contact.phoneNumber2,
      email: contact.email,
      city: contact.city,
      residential: contact.residential,
    },
  });

  const router = useRouter();

  const { handleSubmit, reset } = form;

  const handleSubmitForm = async (data: ContactDetailsInput) => {
    const result = await updateProfile(userId, data);

    if (result.success) {
      reset(data);
      router.refresh();
    } else {
      console.error(result.message);
    }
  };

  return (
    <form
      data-testid="contact-details-form"
      className="flex flex-col gap-4 md:gap-8 py-8 md:py-10 px-0 md:px-5"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <ContactDetailsForm form={form} />
    </form>
  );
};

export default ContactDetailsSection;
