const ENDPOINT = 'https://api.crm.fidihospitality.com/api/public/v1/inquiries/';

// Cutover switch: set N8N_LEADS_ENABLED=false in Vercel to stop the old n8n to Zoho path.
export const n8nLeadsEnabled = () => process.env.N8N_LEADS_ENABLED !== 'false';

// Copies a website lead to FiDi CRM. Never throws, returns false when the CRM did not store it.
export async function sendToCrm(
  keyEnv: string,
  payload: Record<string, unknown>,
  request: Request
): Promise<boolean> {
  const key = process.env[keyEnv];
  if (!key) {
    console.error(`FiDi CRM intake skipped: ${keyEnv} is not set`);
    return false;
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-FiDi-Key': key,
        'X-Forwarded-For':
          request.headers.get('x-real-ip') ??
          request.headers.get('x-forwarded-for') ??
          '',
        // The CRM counts URLs in fields as spam, so the page goes in the Referer header.
        Referer: request.headers.get('referer') ?? '',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (response.status === 201) return true;
    console.error('FiDi CRM intake error:', response.status, await response.text());
  } catch (error) {
    console.error('FiDi CRM intake unreachable:', error);
  }
  return false;
}
