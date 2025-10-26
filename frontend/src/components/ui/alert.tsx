'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Base Alert Types
export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type AlertSize = 'sm' | 'default' | 'lg';

// Alert Props Interface
interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
  icon?: React.ReactNode;
  showIcon?: boolean;
  actions?: React.ReactNode;
}

// Alert Icon Mapping
const alertIcons = {
  default: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

// Alert Variant Styles
const alertVariants = {
  default: {
    container: 'bg-muted/50 border-border text-foreground',
    icon: 'text-muted-foreground',
    title: 'text-foreground',
    description: 'text-muted-foreground',
  },
  success: {
    container:
      'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-800 dark:text-green-200',
    description: 'text-green-700 dark:text-green-300',
  },
  warning: {
    container:
      'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-200',
    description: 'text-yellow-700 dark:text-yellow-300',
  },
  error: {
    container:
      'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-200',
    description: 'text-red-700 dark:text-red-300',
  },
  info: {
    container:
      'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-200',
    description: 'text-blue-700 dark:text-blue-300',
  },
};

// Alert Size Styles
const alertSizes = {
  sm: {
    container: 'p-3 text-sm',
    icon: 'h-4 w-4',
    title: 'text-sm font-medium',
    description: 'text-xs mt-1',
    dismiss: 'h-4 w-4',
  },
  default: {
    container: 'p-4',
    icon: 'h-5 w-5',
    title: 'text-sm font-medium',
    description: 'text-sm mt-1',
    dismiss: 'h-4 w-4',
  },
  lg: {
    container: 'p-6 text-base',
    icon: 'h-6 w-6',
    title: 'text-base font-medium',
    description: 'text-sm mt-2',
    dismiss: 'h-5 w-5',
  },
};

// Main Alert Component
export function Alert({
  variant = 'default',
  size = 'default',
  title,
  description,
  children,
  className,
  dismissible = false,
  onDismiss,
  autoHide = false,
  autoHideDelay = 5000,
  icon,
  showIcon = true,
  actions,
  ...props
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  // Auto hide functionality
  useEffect(() => {
    if (autoHide && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay, handleDismiss]);

  if (!isVisible) return null;

  const variantStyles = alertVariants[variant];
  const sizeStyles = alertSizes[size];
  const IconComponent = icon ? null : alertIcons[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative rounded-lg border transition-all duration-200 ease-in-out',
        variantStyles.container,
        sizeStyles.container,
        className
      )}
      {...props}
    >
      <div className="flex items-start">
        {/* Icon */}
        {showIcon && (
          <div className="flex-shrink-0">
            {icon ? (
              <div className={cn(sizeStyles.icon, variantStyles.icon)}>
                {icon}
              </div>
            ) : IconComponent ? (
              <IconComponent
                className={cn(sizeStyles.icon, variantStyles.icon)}
              />
            ) : null}
          </div>
        )}

        {/* Content */}
        <div className={cn('flex-1', showIcon && 'ml-3')}>
          {title && (
            <div className={cn(sizeStyles.title, variantStyles.title)}>
              {title}
            </div>
          )}

          {description && (
            <div
              className={cn(sizeStyles.description, variantStyles.description)}
            >
              {description}
            </div>
          )}

          {children && (
            <div
              className={cn(
                description || title ? 'mt-2' : '',
                variantStyles.description
              )}
            >
              {children}
            </div>
          )}

          {/* Actions */}
          {actions && <div className="mt-3 flex space-x-2">{actions}</div>}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              'flex-shrink-0 rounded-md transition-colors duration-150',
              'hover:bg-black/5 focus:ring-2 focus:ring-offset-2 focus:outline-none',
              showIcon ? 'ml-3' : 'ml-2',
              variantStyles.icon,
              'focus:ring-current'
            )}
          >
            <span className="sr-only">Dismiss</span>
            <X className={cn(sizeStyles.dismiss)} />
          </button>
        )}
      </div>

      {/* Auto hide progress bar */}
      {autoHide && (
        <div className="absolute right-0 bottom-0 left-0 h-1 overflow-hidden rounded-b-lg bg-black/10">
          <div
            className="h-full rounded-b-lg bg-current opacity-30"
            style={{
              animation: `shrink ${autoHideDelay}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}

// Specialized Alert Components
export function SuccessAlert(props: Omit<AlertProps, 'variant'>) {
  return <Alert variant="success" {...props} />;
}

export function ErrorAlert(props: Omit<AlertProps, 'variant'>) {
  return <Alert variant="error" {...props} />;
}

export function WarningAlert(props: Omit<AlertProps, 'variant'>) {
  return <Alert variant="warning" {...props} />;
}

export function InfoAlert(props: Omit<AlertProps, 'variant'>) {
  return <Alert variant="info" {...props} />;
}

// Toast-like Alert Hook
export function useAlert() {
  const [alerts, setAlerts] = useState<
    Array<{
      id: string;
      props: AlertProps;
    }>
  >([]);

  const showAlert = (props: AlertProps) => {
    const id = Date.now().toString();
    setAlerts((prev) => [...prev, { id, props }]);

    // Auto remove after delay
    if (props.autoHide !== false) {
      setTimeout(() => {
        removeAlert(id);
      }, props.autoHideDelay || 5000);
    }

    return id;
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const showSuccess = (message: string, options?: Partial<AlertProps>) =>
    showAlert({ variant: 'success', description: message, ...options });

  const showError = (message: string, options?: Partial<AlertProps>) =>
    showAlert({ variant: 'error', description: message, ...options });

  const showWarning = (message: string, options?: Partial<AlertProps>) =>
    showAlert({ variant: 'warning', description: message, ...options });

  const showInfo = (message: string, options?: Partial<AlertProps>) =>
    showAlert({ variant: 'info', description: message, ...options });

  const clearAlerts = () => setAlerts([]);

  return {
    alerts,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeAlert,
    clearAlerts,
  };
}

// Alert Container for Toast-like behavior
export function AlertContainer() {
  const { alerts, removeAlert } = useAlert();

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md space-y-2">
      {alerts.map(({ id, props }) => (
        <Alert
          key={id}
          {...props}
          dismissible
          onDismiss={() => removeAlert(id)}
        />
      ))}
    </div>
  );
}

// Form Alert Component (specialized for forms)
export function FormAlert({
  errors,
  success,
  className,
  ...props
}: {
  errors?: string | string[];
  success?: string;
  className?: string;
} & Omit<AlertProps, 'variant' | 'children'>) {
  if (!errors && !success) return null;

  if (success) {
    return (
      <SuccessAlert description={success} className={className} {...props} />
    );
  }

  if (errors) {
    const errorList = Array.isArray(errors) ? errors : [errors];
    return (
      <ErrorAlert
        title={
          errorList.length > 1 ? 'Please fix the following errors:' : undefined
        }
        className={className}
        {...props}
      >
        {errorList.length === 1 ? (
          errorList[0]
        ) : (
          <ul className="list-inside list-disc space-y-1">
            {errorList.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </ErrorAlert>
    );
  }

  return null;
}
