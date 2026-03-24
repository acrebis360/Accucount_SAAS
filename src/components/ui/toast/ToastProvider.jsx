'use client';

import { Toaster } from 'sonner';

const ToastProvider = ({ 
  position = 'top-right',
  theme = 'light',
  expand = false,
  richColors = false,
  closeButton = false,
  duration = 4000,
  className,
  visibleToasts = 3,
  offset = 16,
}) => {
  return (
    <Toaster
      position={position}
      theme={theme}
      expand={expand}
      richColors={richColors}
      closeButton={closeButton}
      duration={duration}
      className={className}
      visibleToasts={visibleToasts}
      offset={offset}
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
    />
  );
};

export default ToastProvider;