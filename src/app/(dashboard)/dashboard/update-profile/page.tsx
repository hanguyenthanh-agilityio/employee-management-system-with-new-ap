import { Avatar, Breadcrumbs } from '@/components';
import { AVATAR_URL } from '@/constants';

const UpdateProfilePage = () => (
  <>
    <Breadcrumbs paths={['Dashboard', 'Update Profile']} />
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <h1 className="text-5xl font-extrabold mb-4 text-blue-600">Profile</h1>
      <p className="text-2xl text-gray-600 text-center">
        This section is currently under construction.
      </p>
      <Avatar src={AVATAR_URL} name={''} />
    </div>
  </>
);

export default UpdateProfilePage;
