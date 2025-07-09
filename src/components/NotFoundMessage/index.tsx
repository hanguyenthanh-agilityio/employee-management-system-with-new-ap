import { BellAlertIcon } from '@heroicons/react/24/solid';

interface NotFoundMessageProps {
  title: string;
}

const NotFoundMessage = ({ title }: NotFoundMessageProps) => (
  <div className="flex flex-col items-center justify-center py-10">
    <BellAlertIcon className="w-10 h-10 mb-4 text-red" />
    <p className="text-2xl font-semibold">{title}</p>
  </div>
);

export default NotFoundMessage;
