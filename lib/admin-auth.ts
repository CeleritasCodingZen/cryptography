import jwt from "jsonwebtoken";

const ADMIN_SECRET =
  process.env.ADMIN_JWT_SECRET!;

export function signAdminToken(payload: {
  id: string;
  username: string;
}) {
  return jwt.sign(payload, ADMIN_SECRET, {
    expiresIn: "12h",
  });
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, ADMIN_SECRET);
}