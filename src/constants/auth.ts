export const authCredentialTypes = {
  celcomDigiNumber: 'celcomDigiNumber',
} as const;

export type AuthCredentialType = (typeof authCredentialTypes)[keyof typeof authCredentialTypes];

export type LocalAuthSession = {
  credentialType: AuthCredentialType;
  displayName: string;
  expiresAt: number;
  version: 1;
};

export const authConstants = {
  demoCelcomDigiNumber: '01100000000',
  demoCelcomDigiNumberDisplay: '011-0000-0000',
  secureStoreKey: 'aster.local-auth-session.v1',
  sessionLifetimeMs: 24 * 60 * 60 * 1000,
  storageService: 'com.celcomdigi.aster.auth',
} as const;

export const authCopy = {
  nonProductionNotice: 'Demo only. Aster does not verify subscribers, send OTPs, or connect to a production support system.',
  otpPendingMessage: 'OTP verification is not available in this non-production build.',
  unsupportedNumberMessage: 'This number is not supported in this demo.',
} as const;

export function normalizeMalaysianPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, '');

  if (digits.startsWith('60') && digits.length > 2) {
    return `0${digits.slice(2)}`;
  }

  return digits;
}

export function isSupportedDemoCelcomDigiNumber(value: string) {
  return normalizeMalaysianPhoneNumber(value) === authConstants.demoCelcomDigiNumber;
}