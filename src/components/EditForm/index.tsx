'use client';

import { updateLeaveApplication } from '@/api/leaveApplications';
import Form from '@/components/Common/Form';
import { LeaveItem } from '@/types/components';

interface EditFormProps {
  leave: LeaveItem;
}

const EditForm = ({ leave }: EditFormProps) => {
  const updateAction = async (formData: FormData) => {
    await updateLeaveApplication(leave.id, formData);
  };

  return (
    <form action={updateAction} className="pt-5">
      <Form leave={leave} />
    </form>
  );
};

export default EditForm;
