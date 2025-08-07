import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    darkMode: {
      current: 'light',
      darkClass: 'dark',
      classTarget: 'html',
      stylePreview: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#00000' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === 'dark';

      return (
        <div className={`${isDark ? 'dark' : ''}`}>
          <div className="h-full w-full bg-white dark:bg-[#0c1120] text-foreground transition-colors duration-300 p-8 border-none">
            <Story />
          </div>
        </div>
      );
    },
  ],
  globals: {
    theme: 'light',
  },
};

export default preview;
