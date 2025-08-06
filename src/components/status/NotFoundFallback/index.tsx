import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

interface NotFoundFallbackProps {
  title?: string;
  message?: string;
  backHref?: string;
  backText?: string;
}

const NotFoundFallback = ({
  title = '404 Not Found',
  message = 'This page could not be found.',
  backHref = '/',
  backText = 'Go Back',
}: NotFoundFallbackProps) => (
  <main className="flex h-full flex-col items-center justify-center gap-2 pt-12 text-center">
    <FaceFrownIcon className="w-12 h-12 text-gray-400" />
    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    <p className="text-sm text-gray-600">{message}</p>
    <Link
      href={backHref}
      className="mt-4 inline-block rounded-md bg-blue-500 px-5 py-2 text-sm text-white transition-colors hover:bg-blue-600"
    >
      {backText}
    </Link>
  </main>
);

export default NotFoundFallback;
