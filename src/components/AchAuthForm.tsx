'use client';

import { useEffect, useState } from 'react';
import {
  AchAuthFormData,
  achAuthTitle,
  achAuthorizationText,
  achFormMissing,
  achNoticeText,
  achRecurringText,
  achRevocationText,
} from '@/lib/ach-auth';

/**
 * ACH Authorization, hosted in a signing packet. Signature, typed name and
 * date come from the packet's adopted signature at signing.
 */
export default function AchAuthForm({
  clientName,
  clientEmail,
  eventDate,
  showErrors,
  onChange,
}: {
  clientName: string;
  clientEmail: string;
  eventDate?: string;
  showErrors: boolean;
  onChange: (formData: Record<string, unknown>, missing: string[]) => void;
}) {
  const [form, setForm] = useState<AchAuthFormData>({
    authorizedAmount: '',
    authType: '',
    oneTimeDate: '',
    firstDebitDate: '',
    frequency: '',
    until: '',
    bankName: '',
    accountHolderName: clientName,
    routingNumber: '',
    accountNumber: '',
    accountNumberConfirm: '',
    accountType: '',
    ownership: '',
    billingAddress: '',
    businessNameTitle: '',
    homePhone: '',
    workPhone: '',
    cellPhone: '',
    email: clientEmail,
    eventDate: eventDate ?? '',
    typeOfEvent: '',
    eventLocation: '48 Wall Street',
  });

  const missing = achFormMissing(form);

  useEffect(() => {
    onChange({ ...form }, missing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const set =
    (key: keyof AchAuthFormData, digitsOnly = false) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({
        ...prev,
        [key]: digitsOnly ? e.target.value.replace(/\D/g, '') : e.target.value,
      }));

  const bad = (message: string) => showErrors && missing.includes(message);

  const field = (isBad: boolean) =>
    `focus:border-primary focus:ring-primary/30 w-full border px-3 py-2.5 text-base text-gray-900 focus:ring-2 focus:outline-none ${
      isBad ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`;

  const input = (
    key: keyof AchAuthFormData,
    label: string,
    error: string | null,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
    digitsOnly = false
  ) => (
    <div>
      <label
        htmlFor={`ach-${key}`}
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={`ach-${key}`}
        value={form[key]}
        onChange={set(key, digitsOnly)}
        className={field(!!error && bad(error))}
        {...props}
      />
    </div>
  );

  const choice = (
    key: 'authType' | 'accountType' | 'ownership',
    value: string,
    label: React.ReactNode,
    error: string
  ) => (
    <label
      className={`flex cursor-pointer items-start gap-3 border p-3 text-sm text-gray-800 ${
        bad(error) ? 'border-red-300 bg-red-50' : 'border-gray-200'
      }`}
    >
      <input
        type="radio"
        name={`ach-${key}`}
        checked={form[key] === value}
        onChange={() => setForm((prev) => ({ ...prev, [key]: value }))}
        className="accent-primary mt-0.5 h-5 w-5 flex-shrink-0"
      />
      <span>{label}</span>
    </label>
  );

  const section = 'text-primary mb-3 text-sm tracking-widest uppercase';

  return (
    <div className="space-y-6 border border-gray-200 bg-white p-5 md:p-8">
      <h3 className="text-lg text-gray-900 md:text-xl">{achAuthTitle}</h3>

      <div className="space-y-3 text-sm leading-relaxed text-gray-700 md:text-[15px]">
        <p>
          {achAuthorizationText(
            form.accountHolderName.trim(),
            form.authorizedAmount.trim()
          )}
        </p>
        <p>{achRecurringText}</p>
        <p>{achRevocationText}</p>
      </div>

      <div className="max-w-xs">
        {input(
          'authorizedAmount',
          'Amount of the debit ($, optional)',
          'Enter a valid amount',
          { inputMode: 'decimal', placeholder: '0.00' }
        )}
      </div>

      <div>
        <p className={section}>Type of authorization (select one)</p>
        <div className="space-y-3">
          {choice(
            'authType',
            'one_time',
            <>
              <strong>One-time debit</strong> — I authorize only the single
              debit identified above. This authorization expires after that
              debit.
            </>,
            'Choose one-time or recurring debits'
          )}
          {form.authType === 'one_time' && (
            <div className="max-w-xs pl-8">
              {input('oneTimeDate', 'Debit date', 'Enter the debit date', {
                type: 'date',
              })}
            </div>
          )}
          {choice(
            'authType',
            'recurring',
            <>
              <strong>Recurring debits</strong> — I authorize future debits as
              amounts become due under my event agreement.
            </>,
            'Choose one-time or recurring debits'
          )}
          {form.authType === 'recurring' && (
            <div className="grid gap-4 pl-8 sm:grid-cols-3">
              {input(
                'firstDebitDate',
                'First debit date',
                'Enter the first debit date',
                { type: 'date' }
              )}
              {input(
                'frequency',
                'Frequency / schedule',
                'Enter the frequency / schedule',
                { placeholder: 'e.g. per payment schedule' }
              )}
              {input('until', 'Until', 'Enter when recurring debits end', {
                placeholder: 'e.g. final payment',
              })}
            </div>
          )}
        </div>
      </div>

      <p className="border border-red-300 p-3 text-center text-sm text-red-700">
        {achNoticeText}
      </p>

      <div>
        <p className={section}>Bank account information</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {input('bankName', 'Bank name', 'Enter the bank name')}
          {input(
            'accountHolderName',
            "Account holder's name (as it appears on the account)",
            "Enter the account holder's name"
          )}
          {input(
            'routingNumber',
            'Routing number (9 digits)',
            'Enter a valid 9-digit routing number',
            { inputMode: 'numeric', maxLength: 9, autoComplete: 'off' },
            true
          )}
          <div />
          {input(
            'accountNumber',
            'Account number',
            'Enter a valid account number',
            { inputMode: 'numeric', maxLength: 17, autoComplete: 'off' },
            true
          )}
          {input(
            'accountNumberConfirm',
            'Confirm account number',
            'Account numbers do not match',
            {
              inputMode: 'numeric',
              maxLength: 17,
              autoComplete: 'off',
              onPaste: (e) => e.preventDefault(),
            },
            true
          )}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {choice(
            'accountType',
            'checking',
            'Checking',
            'Choose checking or savings'
          )}
          {choice(
            'accountType',
            'savings',
            'Savings',
            'Choose checking or savings'
          )}
          {choice(
            'ownership',
            'personal',
            'Personal / consumer',
            'Choose personal or business ownership'
          )}
          {choice(
            'ownership',
            'business',
            'Business',
            'Choose personal or business ownership'
          )}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {input(
            'billingAddress',
            'Billing address (street, city, state, zip)',
            'Enter the billing address',
            { autoComplete: 'street-address' }
          )}
          {input(
            'businessNameTitle',
            `Business name and title${form.ownership === 'business' ? '' : ' (if business account)'}`,
            'Enter the business name and your title'
          )}
          {input('homePhone', 'Home phone', null, { type: 'tel' })}
          {input('workPhone', 'Work phone', null, { type: 'tel' })}
          {input('cellPhone', 'Cell phone', 'Enter a cell phone number', {
            type: 'tel',
            autoComplete: 'tel',
          })}
          {input('email', 'Email', 'Enter a valid email', {
            type: 'email',
            autoComplete: 'email',
          })}
        </div>
      </div>

      <div>
        <p className={section}>Event information</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {input('eventDate', 'Event date', 'Enter the event date', {
            type: 'date',
          })}
          {input('typeOfEvent', 'Type of event', 'Enter the type of event')}
          {input('eventLocation', 'Event location', 'Enter the event location')}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        A voided check or bank-issued account verification is requested; our
        team will follow up if needed. Your full name, electronic signature and
        the date are added when you sign below.
      </p>
    </div>
  );
}
