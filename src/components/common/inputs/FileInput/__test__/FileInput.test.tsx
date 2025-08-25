import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileInput from '..';

describe('FileInput', () => {
  test('applies custom className', () => {
    render(<FileInput className="custom-class" data-testid="file-input" />);
    const input = screen.getByTestId('file-input');
    expect(input).toHaveClass('input-file');
    expect(input).toHaveClass('custom-class');
  });

  test('calls onChange when a file is selected', () => {
    const handleChange = jest.fn();
    render(<FileInput onChange={handleChange} data-testid="file-input" />);
    const input = screen.getByTestId('file-input') as HTMLInputElement;

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.files?.[0]).toEqual(file);
  });
});
