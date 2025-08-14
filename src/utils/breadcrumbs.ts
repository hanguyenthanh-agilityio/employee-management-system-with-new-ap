export const generateBreadcrumbUrl = (
  paths: string[],
  index: number,
): string => {
  return `/${paths
    .slice(0, index + 1)
    .join('/')
    .toLowerCase()
    .replace(/ /g, '-')}`;
};
