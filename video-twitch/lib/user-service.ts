import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  // Query the database to find the user by their username
  const user = await db.user.findUnique({
    where: {
      username, // Search by the provided username
    },
  });

  // Return the user if found, otherwise return null
  return user;
};
