import { generateBreadcrumbUrl } from '../breadcrumbs';

describe('generateBreadcrumbUrl', () => {
  test('Generates correct URL for a single path', () => {
    const result = generateBreadcrumbUrl(['Dashboard'], 0);
    expect(result).toBe('/dashboard');
  });

  test('Generates correct URL for multiple paths', () => {
    const result = generateBreadcrumbUrl(
      ['Dashboard', 'Leave Applications', 'Edit'],
      2,
    );
    expect(result).toBe('/dashboard/leave-applications/edit');
  });
});
