// /utils/password.ts
import bcrypt from "bcryptjs";

export async function saltAndHashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
