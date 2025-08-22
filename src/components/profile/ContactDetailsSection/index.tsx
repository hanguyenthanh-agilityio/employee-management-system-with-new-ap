'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

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

// Constants
import { ERROR_MESSAGE, SUCCESS_MESSAGES } from '@/constants';
import { contactDetailFormFields } from '@/constants/inputField';

interface ContactDetailsSectionProps {
  contact: ContactsDetailsType;
}

const ContactDetailsSection = ({ contact }: ContactDetailsSectionProps) => {
  const form = useForm<ContactDetailsInput>({
    resolver: zodResolver(contactDetails),
    defaultValues: {
      mainPhoneNumber: contact.mainPhoneNumber || '',
      subPhoneNumber: contact.subPhoneNumber || '',
      email: contact.email || '',
      city: contact.city || '',
      residential: contact.residential || '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const { update, errorMessage, setErrorMessage } = useUpdateProfile();

  const [isLoading, setIsLoading] = useState(false);

  const isLoadingSubmit = isLoading || isSubmitting;

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage('');
    }
  }, [errorMessage, setErrorMessage]);

  const handleSubmitForm = async (data: ContactDetailsInput) => {
    setIsLoading(true);

    const sanitizedData: ContactDetailsInput = {
      ...data,
      mainPhoneNumber: data.mainPhoneNumber.replace(/\s+/g, ''),
      subPhoneNumber: data.subPhoneNumber.replace(/\s+/g, ''),
    };

    const result = await update(sanitizedData, String(contact.id));

    if (result.success) {
      toast.success(SUCCESS_MESSAGES.UPDATE_PROFILE_SUCCESS, {
        autoClose: 2000,
        onClose: () => {
          reset(sanitizedData);
          setIsLoading(false);
        },
      });
    } else {
      toast.error(result.message || ERROR_MESSAGE.UPDATE_PROFILE_FAILED, {
        onClose: () => setIsLoading(false),
      });
    }
  };

  return (
    <form
      data-testid="contact-details-form"
      className="flex flex-col gap-4 md:gap-8 py-6 md:px-6 md:py-10"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      {isLoadingSubmit && <TransitionLoader />}

      <fieldset
        className="flex flex-col gap-4 md:gap-6"
        disabled={isLoadingSubmit}
      >
        <ContactDetailsForm
          fields={contactDetailFormFields}
          form={form}
          disable={isLoadingSubmit}
        />
      </fieldset>
    </form>
  );
};

export default ContactDetailsSection;
