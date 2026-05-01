import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(
  email: string,
  otp: string
) {
  const { data, error } = await resend.emails.send({
    from: "Cryptography <onboarding@resend.dev>",
    to: [email],
    subject: "Your verification code",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        background:#0d0c0a;
        color:#e7d8c9;
        padding:40px;
        border-radius:12px;
      ">
        <h2 style="color:#84cc16;">
          Verify your account
        </h2>

        <p>Your OTP is:</p>

        <div style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:6px;
          color:#84cc16;
          margin:20px 0;
        ">
          ${otp}
        </div>

        <p>
          Valid for <b>30 seconds</b>.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}