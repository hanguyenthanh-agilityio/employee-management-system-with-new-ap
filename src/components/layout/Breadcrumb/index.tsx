import Link from 'next/link';

// Utils
import { generateBreadcrumbUrl } from '@/utils/breadcrumbs';

interface BreadcrumbsProps {
  paths: string[];
}

const Breadcrumbs = ({ paths }: BreadcrumbsProps) => (
  <nav
    className="bg-white dark:bg-[#0d1626] text-foreground px-6 md:px-8 py-4 md:py-6 text-xl md:text-[25px] font-medium border-b border-border"
    aria-label="Breadcrumb"
  >
    <ul className="flex flex-wrap gap-1 items-center">
      {paths.map((path, index) => (
        <li key={index} className="flex items-center gap-1">
          {index !== paths.length - 1 ? (
            <>
              <Link
                href={generateBreadcrumbUrl(paths, index)}
                className="hover:underline text-muted-foreground"
              >
                {path}
              </Link>
              <span className="text-muted-foreground">›</span>
            </>
          ) : (
            <span className="text-foreground">{path}</span>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export default Breadcrumbs;
