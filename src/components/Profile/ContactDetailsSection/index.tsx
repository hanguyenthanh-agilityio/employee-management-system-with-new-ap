'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// types
import { ContactsDetailsType } from '@/types';

// Components
import { ContactDetailsForm } from '@/components';

// Utils
import {
  contactDetails,
  ContactDetailsInput,
} from '@/utils/schemas/updateProfile';

interface ContactDetailsSectionProps {
  contact: ContactsDetailsType;
}

const ContactDetailsSection = ({ contact }: ContactDetailsSectionProps) => {
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

  const handleSubmitForm = () => {};

  return (
    <form
      data-testid="contact-details-form"
      className="flex flex-col gap-4 md:gap-8 py-8 md:py-10 px-0 md:px-5"
      onSubmit={form.handleSubmit(handleSubmitForm)}
    >
      <ContactDetailsForm form={form} />
    </form>
  );
};

export default ContactDetailsSection;
