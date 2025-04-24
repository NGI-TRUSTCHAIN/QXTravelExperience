/**
 * Type definitions for DRF Standardized Error responses
 * Based on the drf-standardized-errors package:
 * https://github.com/ghazi-git/drf-standardized-errors
 */

import { toast } from "@/hooks/use-sonner-toast";
import { AxiosError } from "axios";

/**
 * Base error structure that appears in all error responses
 */
export interface StandardizedError {
  code: string;
  detail: string;
  attr: string | null;
}

/**
 * Validation error response structure
 */
export interface ValidationErrorResponse {
  type: 'validation_error';
  errors: StandardizedError[];
}

/**
 * Client error response structure (4xx errors)
 */
export interface ClientErrorResponse {
  type: 'client_error';
  errors: StandardizedError[];
}

/**
 * Server error response structure (5xx errors)
 */
export interface ServerErrorResponse {
  type: 'server_error';
  errors: StandardizedError[];
}

/**
 * Union type for all possible error responses
 */
export type StandardizedErrorResponse =
  | ValidationErrorResponse
  | ClientErrorResponse
  | ServerErrorResponse;

/**
 * Common error codes that might be returned in the 'code' field
 */
export enum ErrorCode {
  // Validation errors
  REQUIRED = 'required',
  MAX_LENGTH = 'max_length',
  MIN_LENGTH = 'min_length',
  INVALID = 'invalid',
  INVALID_CHOICE = 'invalid_choice',
  UNIQUE = 'unique',

  // Authentication errors
  AUTHENTICATION_FAILED = 'authentication_failed',
  NOT_AUTHENTICATED = 'not_authenticated',
  PERMISSION_DENIED = 'permission_denied',

  // Common client errors
  NOT_FOUND = 'not_found',
  METHOD_NOT_ALLOWED = 'method_not_allowed',
  THROTTLED = 'throttled',

  // Server errors
  ERROR = 'error',

  // Custom errors - extend as needed
  CUSTOM_ERROR = 'custom_error',
}

/**
 * Type guard to check if an error response is a ValidationErrorResponse
 */
export function isValidationError(error: StandardizedErrorResponse): error is ValidationErrorResponse {
  return error.type === 'validation_error';
}

/**
 * Type guard to check if an error response is a ClientErrorResponse
 */
export function isClientError(error: StandardizedErrorResponse): error is ClientErrorResponse {
  return error.type === 'client_error';
}

/**
 * Type guard to check if an error response is a ServerErrorResponse
 */
export function isServerError(error: StandardizedErrorResponse): error is ServerErrorResponse {
  return error.type === 'server_error';
}

/**
 * Helper function to extract error messages for a specific field
 */
export function getFieldErrors(
  errorResponse: StandardizedErrorResponse,
  fieldName: string
): StandardizedError[] {
  if (!errorResponse.errors) return [];

  return errorResponse.errors.filter(error => error.attr === fieldName);
}

/**
 * Helper function to extract the first error message for a specific field
 */
export function getFirstFieldError(
  errorResponse: StandardizedErrorResponse,
  fieldName: string
): StandardizedError | undefined {
  const errors = getFieldErrors(errorResponse, fieldName);
  return errors.length > 0 ? errors[0] : undefined;
}

/**
 * Helper function to check if a specific field has errors
 */
export function hasFieldErrors(
  errorResponse: StandardizedErrorResponse,
  fieldName: string
): boolean {
  return getFieldErrors(errorResponse, fieldName).length > 0;
}

/**
 * Helper function to get all non-field errors
 */
export function getNonFieldErrors(errorResponse: StandardizedErrorResponse): StandardizedError[] {
  if (!errorResponse.errors) return [];

  return errorResponse.errors.filter(error => error.attr === null);
}

export function getFormattedErrorDetails(
  errorResponse: StandardizedErrorResponse | undefined
): string {
  if (!errorResponse?.errors || errorResponse.errors.length === 0) {
    return "Unknown error occurred";
  }

  // Filter out specific error pattern where detail is "False" and attr includes "success"
  const filteredErrors = errorResponse.errors.filter(
    error => !(error.detail === "False" && error.attr?.includes("success"))
  );

  if (filteredErrors.length === 0) {
    return "No valid error details available";
  }

  return filteredErrors.map((error) => error.detail).join("\n");
}

export function getErrorType(
  errorResponse: StandardizedErrorResponse | undefined
): string {
  if (!errorResponse) {
    return "Unknown Error !";
  }

  if (isValidationError(errorResponse)) {
    return "Validation Error !";
  }

  if (isClientError(errorResponse)) {
    return "Client Error !";
  }

  if (isServerError(errorResponse)) {
    return "Server Error !";
  }

  return "Unknown Error !";
}

export function showErrorToast(
  error: unknown,
  customTitle?: string,
  variant?: "destructive" | "default"
): StandardizedErrorResponse | undefined {
  const errorResponse = (error as AxiosError<StandardizedErrorResponse>)
    .response?.data;

  toast({
    title: customTitle || getErrorType(errorResponse),
    description: getFormattedErrorDetails(errorResponse),
    variant: variant || "destructive",
    className: "whitespace-pre-line",
  });

  return errorResponse;
}