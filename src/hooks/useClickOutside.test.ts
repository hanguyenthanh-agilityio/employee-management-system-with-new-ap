import '@testing-library/jest-dom';
import { fireEvent, renderHook } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

const setupHook = (onOutsideClick: jest.Mock) => {
  const ref = { current: document.createElement('div') };

  document.body.appendChild(ref.current);

  // renderHook: use to test custom hook
  renderHook(() => useClickOutside(ref, onOutsideClick));

  return ref;
};

describe('useClickOutside', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('Should call handler when clicking outside the element', () => {
    const handler = jest.fn();

    // Simulate dom events(ex: mouseDown)
    fireEvent.mouseDown(document.body);

    expect(handler).toHaveBeenCalledTimes(0);
  });

  test('Should NOT call handler when clicking inside the element', () => {
    const handler = jest.fn();
    const ref = setupHook(handler);

    fireEvent.mouseDown(ref.current!);

    expect(handler).not.toHaveBeenCalled();
  });
});
