import type { Snippet } from '../components/CodeBlock';

export const TRANSFER_SNIPPETS: Snippet[] = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `curl -X POST $WALLETLY_API/v1/transfers \\
  -H "Authorization: Bearer sk_test_••••" \\
  -H "Idempotency-Key: 7f3a9c1e-order-1043" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from_wallet": "wal_tunde",
    "to_wallet": "wal_ifeoma",
    "amount": 250000,
    "currency": "NGN",
    "narration": "Split for dinner"
  }'`,
  },
  {
    label: 'Node',
    lang: 'ts',
    code: `import { Walletly } from "@walletly/node";

const walletly = new Walletly(process.env.WALLETLY_SECRET);

// Retrying with the same key returns the first result
const transfer = await walletly.transfers.create(
  {
    from_wallet: "wal_tunde",
    to_wallet: "wal_ifeoma",
    amount: 250000, // kobo
    currency: "NGN",
  },
  { idempotencyKey: "7f3a9c1e-order-1043" }
);`,
  },
  {
    label: 'Response',
    lang: 'json',
    code: `{
  "id": "trf_01J9X4K2",
  "status": "succeeded",
  "amount": 250000,
  "fee": 0,
  "free_transfers_left": 63,
  "entries": [
    { "account": "wal_tunde", "debit": 250000 },
    { "account": "wal_ifeoma", "credit": 250000 }
  ]
}`,
  },
];

export const WALLET_SNIPPETS: Snippet[] = [
  {
    label: '1 · Wallet',
    lang: 'bash',
    code: `# Create an end-user wallet
curl -X POST $WALLETLY_API/v1/wallets \\
  -H "Authorization: Bearer sk_test_••••" \\
  -H "Idempotency-Key: signup-usr_amaka" \\
  -d '{ "customer_ref": "usr_amaka", "tier": "basic" }'`,
  },
  {
    label: '2 · Account',
    lang: 'bash',
    code: `# Give the wallet a dedicated NGN account number
curl -X POST $WALLETLY_API/v1/virtual-accounts \\
  -H "Authorization: Bearer sk_test_••••" \\
  -H "Idempotency-Key: va-usr_amaka" \\
  -d '{ "wallet": "wal_amaka", "type": "dedicated" }'`,
  },
  {
    label: '3 · Payout',
    lang: 'bash',
    code: `# Send money to any Nigerian bank account
curl -X POST $WALLETLY_API/v1/payouts \\
  -H "Authorization: Bearer sk_test_••••" \\
  -H "Idempotency-Key: payout-8821" \\
  -d '{
    "wallet": "wal_amaka",
    "amount": 1500000,
    "bank_code": "058",
    "account_number": "0123456789"
  }'`,
  },
];

export const WEBHOOK_SNIPPETS: Snippet[] = [
  {
    label: 'Event',
    lang: 'json',
    code: `{
  "id": "evt_01J9X7QK",
  "type": "virtual_account.credited",
  "data": {
    "wallet": "wal_amaka",
    "amount": 500000,
    "gateway": "monnify",
    "balance_after": 1250000
  }
}`,
  },
  {
    label: 'Handler',
    lang: 'ts',
    code: `app.post("/webhooks/walletly", (req, res) => {
  const event = walletly.webhooks.verify(
    req.rawBody,
    req.headers["walletly-signature"]
  );

  // Events can arrive more than once; dedupe on event.id
  if (seen(event.id)) return res.sendStatus(200);

  if (event.type === "virtual_account.credited") {
    notifyUser(event.data.wallet, event.data.amount);
  }
  res.sendStatus(200);
});`,
  },
];
