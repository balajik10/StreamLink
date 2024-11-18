import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

  // Check if the user is authenticated and has a username
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  // Find the user in the database using their external user ID
  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  // If the user is not found in the database
  if (!user) {
    throw new Error("Not found");
  }

  return user;
};

