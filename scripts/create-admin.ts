import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

async function main() {
  const hash = await bcrypt.hash(
    "admin123",
    12
  );

  await prisma.adminUser.create({
    data: {
      username: "admin",
      passwordHash: hash,
    },
  });

  console.log("admin created");
}

main();