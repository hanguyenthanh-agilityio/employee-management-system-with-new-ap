import { render, screen } from '@testing-library/react';
import GenericTable from '..';

interface TestData {
  id: number;
  name: string;
  address: string;
}

const columns = [
  { title: 'ID', render: (item: TestData) => item.id },
  { title: 'Name', render: (item: TestData) => item.name },
  { title: 'Address', render: (item: TestData) => item.address },
];

const data: TestData[] = [
  { id: 1, name: 'Ha', address: 'Address 1' },
  { id: 2, name: 'My', address: 'Address 2' },
];

describe('GenericTable', () => {
  test('renders column headers correctly', () => {
    render(<GenericTable data={data} columns={columns} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
  });

  test('renders table rows with data', () => {
    render(<GenericTable data={data} columns={columns} />);
    expect(screen.getByText('Ha')).toBeInTheDocument();
    expect(screen.getByText('My')).toBeInTheDocument();
    expect(screen.getByText('Address 1')).toBeInTheDocument();
    expect(screen.getByText('Address 2')).toBeInTheDocument();
  });

  test('shows "No data available" if data is empty', () => {
    render(<GenericTable data={[]} columns={columns} />);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });
});
