export const ERROR_MESSAGE = {
  // Authentication Errors
  LOGIN_FAILED: 'Login failed.',
  REGISTER_FAILED: 'Register failed',
  INVALID_CREDENTIALS: 'Invalid credentials',
  MISSING_TOKEN: 'Authentication token is missing',
  TOKEN_NOT_FOUND: 'Token not found',
  ACTIVATION_FAILED: 'Activation failed',

  // User Errors
  UNKNOWN_REGISTER: 'Unknown error during registration',
  UPDATE_USER_FAIL: 'Failed to update user',
  FAILED_TO_FETCH_USER: 'Failed to fetch current user info',
  USER_CACHE_NOT_FOUND: 'User cache not found',
  INVALID_CACHE: 'Invalid cache data',
  MISSING_USER: 'User information is missing. Cannot submit application.',

  // Leave Application Errors
  SUBMIT_LEAVE_FAILED: 'Failed to submit leave application',
  CREATE_LEAVE_FAILED: 'Failed to create leave application.',
  UPDATE_LEAVE_FAILED: 'Failed to update leave application.',
  DELETE_LEAVE_FAILED: 'Failed to delete leave application.',
  SUMMARY_LEAVE_FAILED: 'Unable to load summary leaves',

  // Profile Errors
  UPDATE_PROFILE_FAILED: 'Failed to update contact details.',

  // Validation & Upload
  VALIDATION_FAILED: 'Validation failed',
  UPLOAD_FAILED: 'Upload failed',

  // Network / Unexpected Errors
  UNEXPECTED: 'Unexpected error occurred',
  UNKNOWN: 'Unknown error occurred.',
};
