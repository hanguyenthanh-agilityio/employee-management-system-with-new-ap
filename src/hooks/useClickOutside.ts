import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      setTimeout(() => handler(event), 0);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};
