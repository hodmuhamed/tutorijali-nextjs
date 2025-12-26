'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast bg-white text-gray-900 border border-gray-200 shadow-lg rounded-md',
          description:
            'text-gray-600',
          actionButton:
            'bg-red-600 text-white hover:bg-red-700',
          cancelButton:
            'bg-gray-100 text-gray-700 hover:bg-gray-200',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
