import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS."
    );
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const { SMTP_USER, SMTP_FROM_NAME } = process.env;
  await getTransporter().sendMail({
    from: `"${SMTP_FROM_NAME ?? "JALOUR Website"}" <${SMTP_USER}>`,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  });
}
