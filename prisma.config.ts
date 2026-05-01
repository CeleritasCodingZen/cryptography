import * as dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "prisma/config";

console.log("DATABASE_URL =", !!process.env.DATABASE_URL);
console.log("DIRECT_URL =", !!process.env.DIRECT_URL);

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL!,
  },
});