import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  // Query the database to find the user by their username
  const user = await db.user.findUnique({
    where: {
      username, // Search by the provided username
    },
    select:{
      id:true,
      externalUserId:true,
      username:true,
      bio:true,
      imageUrl:true,
      stream:{
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true
        },
        
      },
      _count:{
        select:{
          followedBy:true, //
        }
      }
    }
  });

  // Return the user if found, otherwise return null
  return user;
};


export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      stream: true, // Including stream in the query
    },
  });
  return user;
};
