import { connectToDB } from "@/lib/connect";
import User from "@/models/User";

/**
 * Fetches a user by email from the database.
 * @param email The email to look up.
 * @returns The user object or null.
 */
export async function getUserFromDb(email: string) {
  try {
    await connectToDB(); // Ensure DB is connected
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error in getUserFromDb:", error);
    return null;
  }
}
