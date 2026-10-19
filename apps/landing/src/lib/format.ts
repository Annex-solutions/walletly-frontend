export const naira = (kobo: number) =>
  '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const shortId = () => Math.random().toString(36).slice(2, 8).toUpperCase();
