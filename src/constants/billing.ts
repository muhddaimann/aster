export type DemoBillingSummary = {
  amountDue: number;
  currency: 'MYR';
  dueDate: string;
  statementPeriod: string;
};

export const demoBillingSummary: DemoBillingSummary = {
  amountDue: 128.5,
  currency: 'MYR',
  dueDate: '2026-11-15T00:00:00+08:00',
  statementPeriod: 'October 2026',
};

export function formatBillingAmount(amount: number, currency: DemoBillingSummary['currency']): string {
  return new Intl.NumberFormat('en-MY', { currency, minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency' }).format(amount);
}

export function formatBillingDate(value: string): string {
  return new Intl.DateTimeFormat('en-MY', { dateStyle: 'long', timeZone: 'Asia/Kuala_Lumpur' }).format(new Date(value));
}
