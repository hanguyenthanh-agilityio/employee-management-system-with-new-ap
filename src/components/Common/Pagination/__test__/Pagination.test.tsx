import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '..';
describe('Pagination component', () => {
  test('does not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });
  test('renders page numbers with ellipsis', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />,
    );
    // Should include 1, ..., 3, 4, 5, 6, 7, ..., 10
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBe(2);
  });
  test('calls onPageChange when clicking on a page number', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
  test('does not call onPageChange when clicking current page', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).not.toHaveBeenCalled();
  });
  test('Previous button is disabled on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
    );
    expect(screen.getByText('Previous')).toBeDisabled();
  });
  test('Next button is disabled on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />,
    );
    expect(screen.getByText('Next')).toBeDisabled();
  });
  test('calls onPageChange when clicking Previous or Next', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
  test('highlights the current page', () => {
    render(
      <Pagination currentPage={4} totalPages={6} onPageChange={() => {}} />,
    );
    const currentButton = screen.getByText('4');
    expect(currentButton).toHaveClass('bg-blue-500');
    expect(currentButton).toHaveClass('text-white');
  });
});
