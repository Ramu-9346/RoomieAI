/**
 * ToastProvider — imperative toast manager.
 * Usage: ToastManager.show({ type: 'success', message: 'Order placed!' })
 *
 * Renders at the root of the app so toasts appear above everything.
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';

import { Toast, type ToastType } from '@components/feedback/Toast';

interface ToastConfig {
  type?: ToastType;
  message: string;
  subtitle?: string;
  duration?: number;
}

interface ToastContextValue {
  show: (config: ToastConfig) => void;
  hide: () => void;
}

const ToastContext = createContext<ToastContextValue>({
  show: () => {},
  hide: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<ToastConfig>({ message: '' });
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback((toastConfig: ToastConfig) => {
    clearTimeout(timerRef.current);
    setConfig(toastConfig);
    setVisible(true);
  }, []);

  const hide = useCallback(() => setVisible(false), []);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      <Toast
        visible={visible}
        type={config.type}
        message={config.message}
        subtitle={config.subtitle}
        duration={config.duration}
        onDismiss={hide}
      />
    </ToastContext.Provider>
  );
}

// Imperative singleton — usable outside React components
export const ToastManager = {
  _show: (_config: ToastConfig) => {},

  show(config: ToastConfig) {
    this._show(config);
  },
};
