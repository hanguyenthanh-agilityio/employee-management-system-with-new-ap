import { Suspense } from 'react';

// Components
import ActivateSection from '@/components/ActivateSection/activateSection';

const ActivatePage = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <Suspense fallback={<div>Loading...</div>}>
      <ActivateSection />
    </Suspense>
  </div>
);

export default ActivatePage;
