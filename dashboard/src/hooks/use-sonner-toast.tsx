import * as React from "react"
import { toast as sonnerToast } from "sonner"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type ToastProps = {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  variant?: "default" | "destructive" | "success"
  duration?: number
  className?: string
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement

// Create a toast function that matches the API of the existing toast
function toast({
  title,
  description,
  action,
  variant = "default",
  duration = 10000000,
  className,
  ...props
}: ToastProps) {
  const closeIcon = <X className="h-4 w-4" />;

  const variantClassNames = {
    default: "border-input bg-background text-foreground",
    destructive: "destructive border-destructive bg-destructive text-destructive-foreground",
    success: "border-green-500 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-50",
  };

  // Use Sonner toast but ensure it follows our styling and API
  return sonnerToast(title as string, {
    description,
    duration,
    closeButton: false,
    action: action ? {
      label: action,
      onClick: () => {}
    } : undefined,
    cancel: {
      label: closeIcon,
      onClick: () => {}
    },
    className: cn(
      "group rounded-lg border p-4 shadow-lg flex items-center justify-between",
      variantClassNames[variant],
      className
    ),
    ...props,
  });
}

// Add methods to match the Radix API
toast.dismiss = sonnerToast.dismiss;

toast.error = (props: Omit<ToastProps, "variant">) =>
  toast({ ...props, variant: "destructive" });

toast.success = (props: Omit<ToastProps, "variant">) =>
  toast({ ...props, variant: "success" });

toast.promise = <T,>(
  promise: Promise<T>,
  {
    loading,
    success,
    error,
  }: {
    loading: string | ToastProps
    success: string | ((data: T) => ToastProps | string)
    error: string | ((error: unknown) => ToastProps | string)
  }
) => {
  const loadingProps = typeof loading === "string"
    ? { title: loading }
    : loading;

  // Create custom toast content for each state
  // Convert loadingProps to a ReactNode
  const loadingToast = typeof loadingProps.title === 'string'
    ? loadingProps.title
    : (
      <div className="flex justify-between items-center">
        <div>
          {loadingProps.title}
          {loadingProps.description && <div>{loadingProps.description}</div>}
        </div>
        <Button onClick={() => toast.dismiss()} variant="link" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>
    );

  return sonnerToast.promise(promise, {
    loading: loadingToast,
    success: (data) => {
      const successProps = typeof success === "function"
        ? success(data)
        : typeof success === "string"
          ? { title: success }
          : success;

      // Create and immediately return a toast with our custom component
      const title = typeof successProps === "string"
        ? successProps
        : successProps.title;

      const description = typeof successProps === "string"
        ? undefined
        : successProps.description;

      return (
        <div className="flex justify-between items-center">
          <div>
            {title}
            {description && <div>{description}</div>}
          </div>
          <Button onClick={() => toast.dismiss()} variant="link" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    error: (err) => {
      const errorProps = typeof error === "function"
        ? error(err)
        : typeof error === "string"
          ? { title: error }
          : error;

      const title = typeof errorProps === "string"
        ? errorProps
        : errorProps.title;

      const description = typeof errorProps === "string"
        ? undefined
        : errorProps.description;

      return (
        <div className="flex justify-between items-center">
          <div>
            {title}
            {description && <div>{description}</div>}
          </div>
          <Button onClick={() => toast.dismiss()} variant="link" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  });
};

function useSonnerToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss
  }
}

export { useSonnerToast, toast }
