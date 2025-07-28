import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '..';

describe('Table component', () => {
  const headers = ['Name', 'Age', 'Email'];
  const rows = [
    ['Alice', 25, 'alice@example.com'],
    ['Bob', 30, 'bob@example.com'],
  ];

  test('renders table headers correctly', () => {
    render(<Table headers={headers} rows={[]} />);
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders table rows and cells correctly', () => {
    render(<Table headers={headers} rows={rows} />);
    rows.forEach((row) => {
      row.forEach((cell) => {
        expect(screen.getByText(String(cell))).toBeInTheDocument();
      });
    });
  });

  test('handles empty rows', () => {
    render(<Table headers={headers} rows={[]} />);
    const renderedRows = screen.getAllByRole('row');
    expect(renderedRows).toHaveLength(1);
  });
});
