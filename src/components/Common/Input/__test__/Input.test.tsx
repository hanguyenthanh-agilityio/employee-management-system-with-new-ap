import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Input from '..';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

describe('Input component', () => {
  test('renders the label', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  test('renders the icon if provided', () => {
    render(
      <Input
        label="Email"
        icon={
          <span data-testid="icon">
            <EnvelopeIcon />
          </span>
        }
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
