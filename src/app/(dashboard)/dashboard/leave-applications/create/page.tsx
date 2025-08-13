import { Metadata } from 'next';

// Components
import { CreateLeaveContent } from '@/components';

// Styles
import '@/styles/formStyle.css';

export const metadata: Metadata = {
  title: 'Create Leave',
};

const CreateLeavePage = () => {
  return (
    <>
      <CreateLeaveContent />
    </>
  );
};

export default CreateLeavePage;
