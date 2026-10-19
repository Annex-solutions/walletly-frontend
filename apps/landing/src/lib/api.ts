/**
 * Form submissions go to the endpoint configured at build time. Without one
 * (local dev, previews) the request is skipped so the flow still completes.
 */
const WAITLIST_ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

export type WaitlistPayload = {
  name: string;
  email: string;
  company: string;
  volume: string;
  useCases: string[];
};

export async function submitWaitlist(payload: WaitlistPayload) {
  if (!WAITLIST_ENDPOINT) {
    await new Promise((r) => setTimeout(r, 700));
    return;
  }
  const res = await fetch(WAITLIST_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Waitlist request failed with ${res.status}`);
}

export const isWorkEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
