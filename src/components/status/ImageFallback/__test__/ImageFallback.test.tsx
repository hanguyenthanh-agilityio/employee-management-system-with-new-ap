import { render, screen, fireEvent } from '@testing-library/react';
import FallbackImage from '..';
import { FC, ImgHTMLAttributes } from 'react';

jest.mock('next/image', () => {
  const MockImage: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    return <img {...props} alt={props.alt ?? ''} />;
  };
  MockImage.displayName = 'MockNextImage';
  return MockImage;
});

describe('FallbackImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test Image',
    width: 100,
    height: 100,
    className: 'test-class',
    fallback: '/fallbackImage.png',
  };

  test('Should render with initial src', () => {
    render(<FallbackImage {...defaultProps} />);
    const img = screen.getByAltText(defaultProps.alt) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(defaultProps.src);
  });

  test('Renders with fallback when src is empty string', () => {
    render(
      <FallbackImage
        src=""
        alt="Empty Src Image"
        width={100}
        height={100}
        fallback="/fallbackImage.png"
      />,
    );
    const img = screen.getByAltText('Empty Src Image') as HTMLImageElement;
    expect(img.src).toContain('/fallbackImage.png');
  });

  test('Should switch to fallback on error', () => {
    render(<FallbackImage {...defaultProps} />);
    const img = screen.getByAltText(defaultProps.alt) as HTMLImageElement;

    fireEvent.error(img);

    expect(img.src).toContain(defaultProps.fallback);
  });
});
