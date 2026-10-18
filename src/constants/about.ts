export const appAbout = {
  name: 'Aster',
  about:
    'Customer Support and Ticketing platform for CelcomDigi Telco customers to submit and manage support enquiries.',
  slug: 'aster-support',
  scheme: 'aster',
  version: '0.2.0',
  designDirection:
    'A calm, trustworthy telco-support experience built on deep navy and bright cyan accents.',
  changelog: [
    {
      version: '0.2.0',
      summary: 'Added the non-production CelcomDigi demo authentication flow with secure local sessions and logout.',
    },
    {
      version: '0.1.0',
      summary: 'Added shared screen, picker, and coordinated floating-control foundations.',
    },
    {
      version: '0.0.0',
      summary: 'Established the initial native app foundation.',
    },
  ],
} as const;