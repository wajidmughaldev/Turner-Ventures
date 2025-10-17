// netlify/functions/smtp-check.js
exports.handler = async () => {
  const keys = [
    "SMTP_HOST","SMTP_PORT","SMTP_SECURE","SMTP_USER","SMTP_PASS",
    "FROM_EMAIL","TO_EMAIL"
  ];
  const present = Object.fromEntries(keys.map(k => [k, !!process.env[k]]));

  // also return the exact strings for HOST/PORT/SECURE/USER/FROM (masked)
  const mask = (s='') => s.replace(/.(?=.{4})/g, "•"); // keep last 4 chars
  const echo = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    FROM_EMAIL: process.env.FROM_EMAIL,
  };

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ present, echo }),
  };
};
