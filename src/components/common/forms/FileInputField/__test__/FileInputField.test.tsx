import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileInputField } from '..';
import React from 'react';

describe('FileInputField', () => {
  test('renders required indicator when required prop is true', () => {
    render(<FileInputField name="resume" label="Resume" required />);

    const label = screen.getByText('Resume');
    expect(label).toBeInTheDocument();
    // Check if required indicator (*) exists
    expect(label).toHaveTextContent(/\*/);
  });

  test('renders error message as array', () => {
    render(
      <FileInputField
        name="doc"
        label="Document"
        errorMessage={['File is required', 'Invalid format']}
      />,
    );

    const error = screen.getByText('File is required, Invalid format');
    expect(error).toBeInTheDocument();
  });
});
