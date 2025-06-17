import Link from 'next/link';

// Utils
import { generateBreadcrumbUrl } from '@/utils/breadcrumbs';

interface BreadcrumbsProps {
  paths: string[];
}

const Breadcrumbs = ({ paths }: BreadcrumbsProps) => (
  <nav className="bg-white px-8 py-6 text-gray-700 text-[25px] font-medium py-2 mb-4">
    <ul className="flex flex-wrap gap-1 items-center">
      {paths.map((path, index) => (
        <li key={index} className="flex items-center gap-1">
          {index !== paths.length - 1 ? (
            <>
              <Link
                href={generateBreadcrumbUrl(paths, index)}
                className="hover:underline"
              >
                {path}
              </Link>
              <span>{'>'}</span>
            </>
          ) : (
            <span className="text-black">{path}</span>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export default Breadcrumbs;
