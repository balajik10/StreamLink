"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

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


export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();
  
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { username }
  });

  if (!user) {
    throw new Error("User not found");
  }
  if (self.username!==user.username) {
    throw new Error("Unauthorized");
  }

  return self;
};

