import {
  ClientErrorResponse,
  ServerErrorResponse,
  StandardizedErrorResponse,
  ValidationErrorResponse,
  getNonFieldErrors,
  isClientError,
  isServerError,
  isValidationError,
} from "@/lib/api-errors";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { toast } from "sonner";

/**
 * Custom hook for handling standardized API errors
 */
export function useErrorHandler() {
  /**
   * Handle validation errors (form errors)
   */
  const handleValidationError = useCallback(
    (error: ValidationErrorResponse): void => {
      // Display the first non-field error, if any
      const nonFieldErrors = getNonFieldErrors(error);
      if (nonFieldErrors.length > 0) {
        toast.error(nonFieldErrors[0].detail);
      } else if (error.errors.length > 0) {
        // Or display the first field error if there are no non-field errors
        toast.error(error.errors[0].detail);
      }

      // Field-specific errors are typically handled by the form components
    },
    []
  );

  /**
   * Handle client errors (4xx)
   */
  const handleClientError = useCallback((error: ClientErrorResponse): void => {
    // Display all client errors
    error.errors.forEach((err) => {
      toast.error(err.detail);
    });
  }, []);

  /**
   * Handle server errors (5xx)
   */
  const handleServerError = useCallback((error: ServerErrorResponse): void => {
    // Display all server errors
    error.errors.forEach((err) => {
      toast.error(err.detail);
    });
  }, []);

  /**
   * Handle a standardized error response
   */
  const handleStandardizedError = useCallback(
    (error: StandardizedErrorResponse): void => {
      if (isValidationError(error)) {
        // Handle validation errors
        handleValidationError(error);
      } else if (isClientError(error)) {
        // Handle client errors
        handleClientError(error);
      } else if (isServerError(error)) {
        // Handle server errors
        handleServerError(error);
      }
    },
    [handleValidationError, handleClientError, handleServerError]
  );

  /**
   * Handle Axios errors that might contain standardized error responses
   */
  const handleAxiosError = useCallback(
    (error: AxiosError<StandardizedErrorResponse>): void => {
      // If the error response contains standardized error data
      if (error.response?.data) {
        handleStandardizedError(error.response.data);
      } else {
        // Fallback for non-standardized errors
        toast.error(error.message || "An unexpected error occurred");
      }
    },
    [handleStandardizedError]
  );

  return {
    handleStandardizedError,
    handleValidationError,
    handleClientError,
    handleServerError,
    handleAxiosError,
  };
}

export default useErrorHandler;
