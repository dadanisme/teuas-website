import { ERROR_MESSAGES } from '@/constants/errors';

/**
 * Maps error objects to Indonesian error messages
 * Handles Supabase errors, database errors, network errors, and generic errors
 */
export function mapErrorToIndonesian(error: unknown): string {
  // Log original error in development for debugging
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error('Original error:', error);
  }

  // Handle null/undefined
  if (!error) {
    return ERROR_MESSAGES.GENERIC.UNKNOWN;
  }

  // Extract error message
  let errorMessage = '';

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (typeof error === 'object' && 'message' in error) {
    errorMessage = String((error as { message: unknown }).message);
  } else {
    return ERROR_MESSAGES.GENERIC.UNKNOWN;
  }

  const lowerErrorMessage = errorMessage.toLowerCase();

  // Supabase Authentication Errors
  if (
    lowerErrorMessage.includes('invalid login credentials') ||
    lowerErrorMessage.includes('invalid email or password')
  ) {
    return ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS;
  }

  if (
    lowerErrorMessage.includes('user already registered') ||
    lowerErrorMessage.includes('user already exists') ||
    lowerErrorMessage.includes('email already exists')
  ) {
    return ERROR_MESSAGES.AUTH.USER_ALREADY_EXISTS;
  }

  if (
    lowerErrorMessage.includes('email not confirmed') ||
    lowerErrorMessage.includes('email not verified')
  ) {
    return ERROR_MESSAGES.AUTH.EMAIL_NOT_CONFIRMED;
  }

  if (lowerErrorMessage.includes('user not found')) {
    return ERROR_MESSAGES.AUTH.USER_NOT_FOUND;
  }

  if (
    lowerErrorMessage.includes('password') &&
    (lowerErrorMessage.includes('weak') || lowerErrorMessage.includes('short'))
  ) {
    return ERROR_MESSAGES.AUTH.WEAK_PASSWORD;
  }

  if (
    lowerErrorMessage.includes('session') &&
    lowerErrorMessage.includes('expired')
  ) {
    return ERROR_MESSAGES.AUTH.SESSION_EXPIRED;
  }

  if (
    lowerErrorMessage.includes('token') &&
    lowerErrorMessage.includes('expired')
  ) {
    return ERROR_MESSAGES.AUTH.TOKEN_EXPIRED;
  }

  if (
    lowerErrorMessage.includes('unauthorized') ||
    lowerErrorMessage.includes('not authorized')
  ) {
    return ERROR_MESSAGES.AUTH.UNAUTHORIZED;
  }

  if (lowerErrorMessage.includes('signup disabled')) {
    return ERROR_MESSAGES.AUTH.SIGNUP_DISABLED;
  }

  // Database Errors
  if (
    lowerErrorMessage.includes('not found') ||
    lowerErrorMessage.includes('no rows')
  ) {
    return ERROR_MESSAGES.DATABASE.NOT_FOUND;
  }

  if (
    lowerErrorMessage.includes('permission denied') ||
    lowerErrorMessage.includes('access denied')
  ) {
    return ERROR_MESSAGES.DATABASE.PERMISSION_DENIED;
  }

  if (
    lowerErrorMessage.includes('duplicate') ||
    lowerErrorMessage.includes('already exists')
  ) {
    return ERROR_MESSAGES.DATABASE.DUPLICATE_ENTRY;
  }

  if (lowerErrorMessage.includes('foreign key')) {
    return ERROR_MESSAGES.DATABASE.FOREIGN_KEY_VIOLATION;
  }

  if (lowerErrorMessage.includes('constraint')) {
    return ERROR_MESSAGES.DATABASE.CONSTRAINT_VIOLATION;
  }

  if (
    lowerErrorMessage.includes('connection') &&
    (lowerErrorMessage.includes('failed') ||
      lowerErrorMessage.includes('refused'))
  ) {
    return ERROR_MESSAGES.DATABASE.CONNECTION_FAILED;
  }

  // Network Errors
  if (
    lowerErrorMessage.includes('network') ||
    lowerErrorMessage.includes('fetch failed')
  ) {
    return ERROR_MESSAGES.NETWORK.NO_CONNECTION;
  }

  if (lowerErrorMessage.includes('timeout')) {
    return ERROR_MESSAGES.NETWORK.TIMEOUT;
  }

  if (
    lowerErrorMessage.includes('500') ||
    lowerErrorMessage.includes('internal server') ||
    lowerErrorMessage.includes('server error')
  ) {
    return ERROR_MESSAGES.NETWORK.SERVER_ERROR;
  }

  if (
    lowerErrorMessage.includes('400') ||
    lowerErrorMessage.includes('bad request')
  ) {
    return ERROR_MESSAGES.NETWORK.BAD_REQUEST;
  }

  if (
    lowerErrorMessage.includes('503') ||
    lowerErrorMessage.includes('service unavailable')
  ) {
    return ERROR_MESSAGES.NETWORK.SERVICE_UNAVAILABLE;
  }

  if (
    lowerErrorMessage.includes('429') ||
    lowerErrorMessage.includes('too many requests')
  ) {
    return ERROR_MESSAGES.NETWORK.TOO_MANY_REQUESTS;
  }

  // Validation Errors
  if (
    lowerErrorMessage.includes('invalid') &&
    lowerErrorMessage.includes('email')
  ) {
    return ERROR_MESSAGES.VALIDATION.INVALID_EMAIL_FORMAT;
  }

  if (
    lowerErrorMessage.includes('invalid input') ||
    lowerErrorMessage.includes('validation')
  ) {
    return ERROR_MESSAGES.VALIDATION.INVALID_INPUT;
  }

  // Storage Errors
  if (
    lowerErrorMessage.includes('upload') &&
    lowerErrorMessage.includes('failed')
  ) {
    return ERROR_MESSAGES.STORAGE.UPLOAD_FAILED;
  }

  if (
    lowerErrorMessage.includes('file too large') ||
    lowerErrorMessage.includes('size')
  ) {
    return ERROR_MESSAGES.STORAGE.FILE_TOO_LARGE;
  }

  // Default to generic error
  return ERROR_MESSAGES.GENERIC.UNKNOWN;
}
