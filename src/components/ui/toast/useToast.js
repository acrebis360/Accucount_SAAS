import { toast } from 'sonner';

const useToast = () => {
  const showToast = (message, options = {}) => {
    const {
      type = 'default',
      duration = 4000,
      position = 'top-right',
      action,
      description,
      richColors = false,
      ...rest
    } = options;

    const toastConfig = {
      duration,
      position,
      richColors,
      ...rest,
    };

    if (action) {
      toastConfig.action = action;
    }

    if (description) {
      toastConfig.description = description;
    }

    switch (type) {
      case 'success':
        return toast.success(message, toastConfig);
      case 'error':
        return toast.error(message, toastConfig);
      case 'warning':
        return toast.warning(message, toastConfig);
      case 'info':
        return toast.info(message, toastConfig);
      case 'loading':
        return toast.loading(message, toastConfig);
      case 'action':
        return toast(message, {
          ...toastConfig,
          action: action || {
            label: 'Undo',
            onClick: () => console.log('Undo clicked'),
          },
        });
      default:
        return toast(message, toastConfig);
    }
  };

  // Convenience methods
  const success = (message, options) => showToast(message, { ...options, type: 'success' });
  const error = (message, options) => showToast(message, { ...options, type: 'error' });
  const warning = (message, options) => showToast(message, { ...options, type: 'warning' });
  const info = (message, options) => showToast(message, { ...options, type: 'info' });
  const loading = (message, options) => showToast(message, { ...options, type: 'loading' });
  const dismiss = toast.dismiss;
  const promise = toast.promise;

  return {
    toast: showToast,
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    promise,
  };
};

export default useToast;