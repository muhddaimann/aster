export const supportLanguages = {
  bahasaMalaysia: 'bahasaMalaysia',
  english: 'english',
} as const;

export type SupportLanguage = (typeof supportLanguages)[keyof typeof supportLanguages];

export const preferredContactChannels = {
  email: 'email',
  phone: 'phone',
} as const;

export type PreferredContactChannel = (typeof preferredContactChannels)[keyof typeof preferredContactChannels];

export type CustomerProfile = {
  accountType: 'celcomDigiDemo';
  email: string;
  fullName: string;
  language: SupportLanguage;
  mobileNumberDisplay: string;
  nickname: string;
  preferredContactChannel: PreferredContactChannel;
};

export type EditableCustomerProfile = Pick<CustomerProfile, 'email' | 'fullName' | 'language' | 'nickname' | 'preferredContactChannel'>;

export type ProfileValidationErrors = Partial<Record<keyof EditableCustomerProfile, string>>;

export const initialCustomerProfile: CustomerProfile = {
  accountType: 'celcomDigiDemo',
  email: 'aster.demo@celcomdigi.example',
  fullName: 'CelcomDigi Demo Customer',
  language: supportLanguages.english,
  mobileNumberDisplay: '011-0000-0000',
  nickname: 'Alex',
  preferredContactChannel: preferredContactChannels.phone,
};

export const profileLabels = {
  accountType: 'CelcomDigi demo account',
  contactChannel: {
    [preferredContactChannels.email]: 'Email',
    [preferredContactChannels.phone]: 'Phone call',
  },
  language: {
    [supportLanguages.bahasaMalaysia]: 'Bahasa Malaysia',
    [supportLanguages.english]: 'English',
  },
} as const;

export function validateProfileDraft(draft: EditableCustomerProfile): ProfileValidationErrors {
  const errors: ProfileValidationErrors = {};
  const fullName = draft.fullName.trim();
  const email = draft.email.trim();

  if (!fullName) {
    errors.fullName = 'Enter your full name.';
  }

  if (draft.nickname.trim().length > 30) {
    errors.nickname = 'Use 30 characters or fewer for your nickname.';
  }

  if (!email) {
    errors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
}
