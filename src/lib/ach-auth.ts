/**
 * ACH Authorization: wording (from the 48 Wall Street ACH Authorization Form)
 * and the completeness rules shared by the signing page and the submit API.
 */

export const achAuthTitle = 'ACH Authorization Form';

export const achAuthorizationText = (name: string, amount: string) =>
  `I, ${name || '____________________'}, hereby authorize 48 Wall Street Events Inc. to initiate electronic fund transfers (ACH debits) from the bank account identified below, in the amount of $${amount || '__________'} ("the debit"), and to credit the same account for any refunds or adjustments owed to me. I certify that I am the account holder or an authorized signer on the account identified below.`;

export const achRecurringText =
  'Where I have selected "Recurring Debits" below, I further authorize 48 Wall Street Events Inc. to debit the same account for future amounts owed in connection with my event, including retainer, final, or remaining contract payments; charges for additional guests beyond a contracted amount; damage to the venue, equipment, or persons; an event lasting beyond its scheduled end time; additional labor; and any additional goods or services requested at an event. If any debit will vary in amount from the amount authorized above, 48 Wall Street Events Inc. will provide written notice of the amount and date at least ten (10) calendar days before the debit is initiated, unless I agree in writing to a specified range of amounts.¹';

export const achRevocationText =
  'I understand that I may revoke this authorization at any time by notifying 48 Wall Street Events Inc. by mail at 140 Florida St, Farmingdale, NY 11735, or by phone at 631.777.2244, in time to give 48 Wall Street Events Inc. and my financial institution a reasonable opportunity to act on it. Revocation does not cancel amounts already owed under my event agreement. For recurring debits, this authorization ends on the date or condition selected below, unless revoked earlier, and my bank is not obligated to complete a debit if my account contains insufficient funds. A copy of this signed authorization will be provided to me for my records.²';

export const achNoticeText =
  'Please note that ACH payments will appear as electronic debits on your bank statement. Cancellation and refund terms remain governed by your event agreement.';

export const achFootnotes = [
  '¹ Nacha Operating Rules / 12 CFR §1005.10(d): written notice of amount and date at least 10 calendar days before a variable debit — achdevguide.nacha.org/how-ach-works.',
  '² 12 CFR §1005.10(b): written authorization and copy to the consumer — consumerfinance.gov/rules-policy/regulations/1005/10/.',
];

export const achSignerConfirm =
  'I confirm I am the account holder or an authorized signer on the bank account provided.';

export interface AchAuthFormData {
  authorizedAmount: string;
  authType: '' | 'one_time' | 'recurring';
  oneTimeDate: string;
  firstDebitDate: string;
  frequency: string;
  until: string;
  bankName: string;
  accountHolderName: string;
  routingNumber: string;
  accountNumber: string;
  accountNumberConfirm: string;
  accountType: '' | 'checking' | 'savings';
  ownership: '' | 'personal' | 'business';
  billingAddress: string;
  businessNameTitle: string;
  homePhone: string;
  workPhone: string;
  cellPhone: string;
  email: string;
  eventDate: string;
  typeOfEvent: string;
  eventLocation: string;
}

/** ABA routing number: 9 digits with a valid checksum. */
export function routingNumberValid(value: string): boolean {
  if (!/^\d{9}$/.test(value)) return false;
  const d = value.split('').map(Number);
  const sum =
    3 * (d[0] + d[3] + d[6]) + 7 * (d[1] + d[4] + d[7]) + (d[2] + d[5] + d[8]);
  return sum % 10 === 0;
}

/** What is still missing or wrong, in form order. Empty means complete. */
export function achFormMissing(
  form: Partial<Record<keyof AchAuthFormData, unknown>> | undefined
): string[] {
  const f = (key: keyof AchAuthFormData) => String(form?.[key] ?? '').trim();
  const amount = f('authorizedAmount');
  const account = f('accountNumber');
  return [
    amount && !(Number(amount) > 0) && 'Enter a valid amount',
    !['one_time', 'recurring'].includes(f('authType')) &&
      'Choose one-time or recurring debits',
    f('authType') === 'one_time' && !f('oneTimeDate') && 'Enter the debit date',
    f('authType') === 'recurring' &&
      !f('firstDebitDate') &&
      'Enter the first debit date',
    f('authType') === 'recurring' &&
      !f('frequency') &&
      'Enter the frequency / schedule',
    f('authType') === 'recurring' &&
      !f('until') &&
      'Enter when recurring debits end',
    !f('bankName') && 'Enter the bank name',
    !f('accountHolderName') && "Enter the account holder's name",
    !routingNumberValid(f('routingNumber')) &&
      'Enter a valid 9-digit routing number',
    !/^\d{4,17}$/.test(account) && 'Enter a valid account number',
    account !== f('accountNumberConfirm') && 'Account numbers do not match',
    !['checking', 'savings'].includes(f('accountType')) &&
      'Choose checking or savings',
    !['personal', 'business'].includes(f('ownership')) &&
      'Choose personal or business ownership',
    !f('billingAddress') && 'Enter the billing address',
    f('ownership') === 'business' &&
      !f('businessNameTitle') &&
      'Enter the business name and your title',
    !f('cellPhone') && 'Enter a cell phone number',
    !/^\S+@\S+\.\S+$/.test(f('email')) && 'Enter a valid email',
    !f('eventDate') && 'Enter the event date',
    !f('typeOfEvent') && 'Enter the type of event',
    !f('eventLocation') && 'Enter the event location',
  ].filter((m): m is string => !!m);
}

/** "123456789" → "•••• 6789", for anywhere the full number is not needed. */
export const maskAccount = (value: unknown) =>
  `•••• ${String(value ?? '').slice(-4)}`;
