import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {

  // Ensure the user is authenticated
  const user = await getSelf();

  // Fetch the recommended users from the database
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc", // Orders users by creation date, descending
    },
  });

  return users;
};
