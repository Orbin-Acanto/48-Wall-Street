/**
 * Client for the booking API.
 *
 * The service is deployed separately (see the booking-api repo). Point
 * NEXT_PUBLIC_BOOKING_API_URL at it; without that the UI shows a friendly
 * "booking is not available" state rather than failing noisily.
 */

export type Experience = 'santa' | 'hamilton';

export interface Slot {
  id: string;
  experience: Experience;
  slot_date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  remaining: number;
  is_sold_out: boolean;
  price_cents: number | null;
  note: string | null;
}

export interface Day {
  slot_date: string;
  slots: Slot[];
  total_remaining: number;
}

export interface PriceTier {
  party_size: number;
  subtotal: string;
  admin_fee: string;
  sales_tax: string;
  total: string;
  total_cents: number;
}

export interface Pricing {
  rate: string;
  rate_cents: number;
  admin_fee_rate: number;
  sales_tax_rate: number;
  tiers: PriceTier[];
}

export interface Availability {
  experience: Experience;
  days: Day[];
  party_min: number;
  party_max: number;
  pricing: Pricing;
}

export interface BookingRequest {
  slot_id: string;
  party_size: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company?: string | null;
  children_count?: number | null;
  special_requests?: string | null;
}

export interface BookingResult {
  reference: string;
  experience: Experience;
  slot_date: string;
  start_time: string;
  end_time: string;
  party_size: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}

const BASE = process.env.NEXT_PUBLIC_BOOKING_API_URL ?? '';

export function isBookingConfigured(): boolean {
  return Boolean(BASE);
}

/** Error carrying the API's message so the UI can show something useful. */
export class BookingApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'BookingApiError';
    this.status = status;
  }
}

async function parseError(res: Response): Promise<never> {
  let detail = 'Something went wrong. Please try again.';
  try {
    const body = await res.json();
    if (typeof body?.detail === 'string') detail = body.detail;
  } catch {
    // Response was not JSON; keep the generic message.
  }
  throw new BookingApiError(detail, res.status);
}

export async function fetchAvailability(
  experience: Experience,
  signal?: AbortSignal
): Promise<Availability> {
  if (!BASE) {
    throw new BookingApiError('Booking is not available right now.', 503);
  }

  const res = await fetch(
    `${BASE}/api/availability/${experience}?include_sold_out=true`,
    { signal, headers: { Accept: 'application/json' } }
  );

  if (!res.ok) return parseError(res);
  return res.json();
}

export async function createBooking(
  payload: BookingRequest
): Promise<BookingResult> {
  if (!BASE) {
    throw new BookingApiError('Booking is not available right now.', 503);
  }

  const res = await fetch(`${BASE}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return parseError(res);
  return res.json();
}

/** "2026-12-05" to "Saturday, December 5" without timezone drift. */
export function formatSlotDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

/** "2026-12-05" to "Dec 5". */
export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** "14:20:00" to "2:20pm". */
export function formatSlotTime(value: string): string {
  const [hRaw, mRaw] = value.split(':').map(Number);
  const suffix = hRaw < 12 ? 'am' : 'pm';
  const hour = hRaw % 12 || 12;
  return mRaw
    ? `${hour}:${String(mRaw).padStart(2, '0')}${suffix}`
    : `${hour}${suffix}`;
}

/**
 * Tells the booking API that the credit card authorization was signed, which
 * moves the booking from held to confirmed and stops it being released.
 *
 * Returns false rather than throwing: the client has already signed, so a
 * transport failure must not present as a failed signature.
 */
export async function reportAuthorizationSigned(
  reference: string,
  signature: string
): Promise<boolean> {
  if (!BASE) return false;

  try {
    const res = await fetch(`${BASE}/api/authorizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ reference, signature }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Booking details shown on the authorization page. */
export interface BookingStatus {
  reference: string;
  experience: Experience;
  slot_date: string;
  start_time: string;
  end_time: string;
  party_size: number;
  first_name: string;
  last_name: string;
  status: string;
  authorization_signed: boolean;
  /** Itemised charge, quoted by the API so the form cannot disagree with it. */
  rate?: string | null;
  subtotal?: string | null;
  admin_fee?: string | null;
  sales_tax?: string | null;
  total?: string | null;
}

export async function fetchBookingStatus(
  reference: string
): Promise<BookingStatus | null> {
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/api/bookings/${reference}/status`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
