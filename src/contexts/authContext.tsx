import * as SecureStore from 'expo-secure-store';
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authConstants, authCredentialTypes, type AuthCredentialType, type LocalAuthSession } from '../constants/auth';

export type AuthStatus = 'authenticated' | 'hydrating' | 'unauthenticated';

type AuthContextValue = {
  completeCelcomDigiDemoOtp: () => Promise<boolean>;
  credentialType: AuthCredentialType | null;
  displayName: string | null;
  expiresAt: number | null;
  logout: () => Promise<boolean>;
  status: AuthStatus;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function isValidSession(value: unknown): value is LocalAuthSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const session = value as Partial<LocalAuthSession>;
  return session.version === 1
    && session.credentialType === authCredentialTypes.celcomDigiNumber
    && typeof session.displayName === 'string'
    && typeof session.expiresAt === 'number';
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>('hydrating');
  const [session, setSession] = useState<LocalAuthSession | null>(null);

  const clearStoredSession = useCallback(async () => {
    try {
      if (await SecureStore.isAvailableAsync()) {
        await SecureStore.deleteItemAsync(authConstants.secureStoreKey, { keychainService: authConstants.storageService });
      }
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        if (!await SecureStore.isAvailableAsync()) {
          if (mounted) setStatus('unauthenticated');
          return;
        }

        const storedValue = await SecureStore.getItemAsync(authConstants.secureStoreKey, { keychainService: authConstants.storageService });
        if (!storedValue) {
          if (mounted) setStatus('unauthenticated');
          return;
        }

        const parsedValue: unknown = JSON.parse(storedValue);
        if (!isValidSession(parsedValue) || parsedValue.expiresAt <= Date.now()) {
          await clearStoredSession();
          if (mounted) setStatus('unauthenticated');
          return;
        }

        if (mounted) {
          setSession(parsedValue);
          setStatus('authenticated');
        }
      } catch {
        await clearStoredSession();
        if (mounted) setStatus('unauthenticated');
      }
    };

    void hydrate();
    return () => { mounted = false; };
  }, [clearStoredSession]);

  const createSession = useCallback(async (credentialType: AuthCredentialType, displayName: string) => {
    const nextSession: LocalAuthSession = {
      credentialType,
      displayName,
      expiresAt: Date.now() + authConstants.sessionLifetimeMs,
      version: 1,
    };

    try {
      if (!await SecureStore.isAvailableAsync()) {
        return false;
      }

      await SecureStore.setItemAsync(authConstants.secureStoreKey, JSON.stringify(nextSession), { keychainService: authConstants.storageService });
      setSession(nextSession);
      setStatus('authenticated');
      return true;
    } catch {
      return false;
    }
  }, []);

  const completeCelcomDigiDemoOtp = useCallback(() => createSession(authCredentialTypes.celcomDigiNumber, 'CelcomDigi demo customer'), [createSession]);

  const logout = useCallback(async () => {
    const deleted = await clearStoredSession();
    setSession(null);
    setStatus('unauthenticated');
    return deleted;
  }, [clearStoredSession]);

  const value = useMemo(() => ({
    completeCelcomDigiDemoOtp,
    credentialType: session?.credentialType ?? null,
    displayName: session?.displayName ?? null,
    expiresAt: session?.expiresAt ?? null,
    logout,
    status,
  }), [completeCelcomDigiDemoOtp, logout, session, status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}