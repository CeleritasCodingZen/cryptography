import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { generateOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { username, email, password } =
      await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const otp = generateOTP();
    const hashed = await hashPassword(password);

    const expiresAt = new Date(
      Date.now() + 30 * 1000
    );

    await prisma.pendingUser.upsert({
      where: { email },
      update: {
        username,
        password: hashed,
        otp,
        expiresAt,
        attempts: 0,
      },
      create: {
        username,
        email,
        password: hashed,
        otp,
        expiresAt,
      },
    });

await sendOTPEmail(email, otp);

return NextResponse.json({
  message: "OTP sent",
});
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}