
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const token =
    (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    const payload = verifyToken(token) as { id: string; email: string; role: string };
    
    // Fetch full user data from database
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(null, { status: 401 });
  }
}