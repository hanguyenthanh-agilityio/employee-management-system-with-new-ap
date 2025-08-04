'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

// Components
import { ContactDetailsForm, TransitionLoader } from '@/components';

// Utils
import {
  contactDetails,
  ContactDetailsInput,
} from '@/utils/schemas/updateProfile';

// Hooks
import { useUpdateProfile } from '@/hooks/useProfile';

// Types
import { ContactsDetailsType } from '@/types/profile';

interface ContactDetailsSectionProps {
  contact: ContactsDetailsType;
}

const ContactDetailsSection = ({ contact }: ContactDetailsSectionProps) => {
  const form = useForm<ContactDetailsInput>({
    resolver: zodResolver(contactDetails),
    defaultValues: {
      mainPhoneNumber: contact.mainPhoneNumber ?? '',
      subPhoneNumber: contact.subPhoneNumber ?? '',
      email: contact.email ?? '',
      city: contact.city ?? '',
      residential: contact.residential ?? '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const { update, errorMessage, setErrorMessage } = useUpdateProfile();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage('');
    }
  }, [errorMessage, setErrorMessage]);

  const handleSubmitForm = async (data: ContactDetailsInput) => {
    const result = await update(data, String(contact.id));

    if (result.success) {
      toast.success('Contact details updated successfully!');
      reset(data);
    }
  };

  return (
    <form
      data-testid="contact-details-form"
      className="flex flex-col gap-4 md:gap-8 py-6 md:px-6 md:py-10"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      {isSubmitting && <TransitionLoader />}

      <fieldset className="flex flex-col gap-6" disabled={isSubmitting}>
        <ContactDetailsForm form={form} disable={isSubmitting} />
      </fieldset>
    </form>
  );
};

export default ContactDetailsSection;
