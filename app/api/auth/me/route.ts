
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const token =
    (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json(null);
  }

  try {
    const user = verifyToken(token);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(null);
  }
}