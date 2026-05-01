import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const pending =
      await prisma.pendingUser.findUnique({
        where: { email },
      });

    if (!pending) {
      return NextResponse.json(
        { error: "No pending signup" },
        { status: 404 }
      );
    }

    if (pending.expiresAt < new Date()) {
      await prisma.pendingUser.delete({
        where: { email },
      });

      return NextResponse.json(
        { error: "OTP expired" },
        { status: 400 }
      );
    }

    if (pending.attempts >= 3) {
      await prisma.pendingUser.delete({
        where: { email },
      });

      return NextResponse.json(
        { error: "Too many attempts" },
        { status: 400 }
      );
    }

    if (pending.otp !== otp) {
      await prisma.pendingUser.update({
        where: { email },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });

      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        username: pending.username,
        email: pending.email,
        password: pending.password,
      },
    });

    await prisma.pendingUser.delete({
      where: { email },
    });

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      message: "Verified",
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}