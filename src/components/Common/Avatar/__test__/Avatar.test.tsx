import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import Avatar from '..';

describe('Avatar component', () => {
  test('renders fallback letter when no src is provided', () => {
    render(<Avatar name="Diana" />);
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  test('renders "?" when name is empty', () => {
    render(<Avatar name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  test('renders image when src is provided', () => {
    render(
      <Avatar
        name="Diana"
        src="https://images.icon-icons.com/3708/PNG/512/girl_female_woman_person_people_avatar_icon_230016.png"
      />,
    );
    const image = screen.getByRole('img');
    const src = image.getAttribute('src');

    // Use decodeURIComponent() to decode the encoded string
    const decodedUrl = decodeURIComponent(src || '');

    expect(decodedUrl).toContain(
      'images.icon-icons.com/3708/PNG/512/girl_female_woman_person_people_avatar_icon_230016.png',
    );
    expect(image).toHaveAttribute('alt', 'Diana');
  });
});
