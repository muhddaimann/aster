import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { initialCustomerProfile, validateProfileDraft, type CustomerProfile, type EditableCustomerProfile, type ProfileValidationErrors } from '../constants/profile';
import { useAuth } from '../hooks/useAuth';

type ProfileUpdateResult = {
  errors: ProfileValidationErrors;
  success: boolean;
};

type ProfileContextValue = {
  profile: CustomerProfile;
  resetProfile: () => void;
  updateProfile: (draft: EditableCustomerProfile) => ProfileUpdateResult;
};

export const ProfileContext = createContext<ProfileContextValue | null>(null);

type ProfileProviderProps = {
  children: ReactNode;
};

export function ProfileProvider({ children }: ProfileProviderProps) {
  const { status } = useAuth();
  const [profile, setProfile] = useState<CustomerProfile>(initialCustomerProfile);

  useEffect(() => {
    if (status !== 'authenticated') {
      setProfile(initialCustomerProfile);
    }
  }, [status]);

  const resetProfile = useCallback(() => {
    setProfile(initialCustomerProfile);
  }, []);

  const updateProfile = useCallback((draft: EditableCustomerProfile): ProfileUpdateResult => {
    const errors = validateProfileDraft(draft);
    if (Object.keys(errors).length > 0) {
      return { errors, success: false };
    }

    setProfile((currentProfile) => ({
      ...currentProfile,
      email: draft.email.trim(),
      fullName: draft.fullName.trim(),
      language: draft.language,
      preferredContactChannel: draft.preferredContactChannel,
    }));
    return { errors: {}, success: true };
  }, []);

  const value = useMemo(() => ({ profile, resetProfile, updateProfile }), [profile, resetProfile, updateProfile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}