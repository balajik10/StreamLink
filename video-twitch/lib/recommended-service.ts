import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];
  if (userId) {
    // Fetch users with authentication
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId, // Excludes the current user from the list
        },
      },
      orderBy: {
        createdAt: "desc", // Orders users by creation date, descending
      },
    });
  } else {
    // Fetch users without authentication
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc", // Orders users by creation date, descending
      },
    });
  }

  return users;
};
