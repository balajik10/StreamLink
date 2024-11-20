import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const isFollowingUser = async (id: string) => {
  try {
    // Get the authenticated user
    const self = await getSelf();
    
    // Find the other user by their ID
    const otherUser = await db.user.findUnique({
      where: { id },
    });

    // Check if the user exists
    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
        return true;
    }
    const existingFollow=await db.follow.findFirst({
        where: {
          followerId: self.id,
          followingId: id,
        },
    });

    return !!existingFollow 


  } catch  {
    // Return false if there is any error (including user not found)
    return false;
  }
};

export const followUser = async (id: string) => {
    // Get the current logged-in user
    const self = await getSelf();
  
    // Fetch the user to follow
    const otherUser = await db.user.findUnique({
      where: { id },
    });
  
    // Check if the user to follow exists
    if (!otherUser) {
      throw new Error("User not found");
    }
  
    // Check if the user is trying to follow themselves
    if (otherUser.id === self.id) {
      throw new Error("Cannot follow yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
          followerId: self.id,
          followingId: id,
        },
      });

      if (existingFollow) {
        throw new Error("Already following this user");
      }

      const follow =await db.follow.create ({
        data: {
          followerId: self.id,
          followingId: id,
        },
        include:{
            follower: true,
            following: true,
        }
      });

      return follow;
  };
  

  export const unfollowUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
         id 
        },
    });
  
    if (!otherUser) {
      throw new Error("User not found");
    }
  
    if (otherUser.id === self.id) {
      throw new Error("Cannot unfollow yourself");
    }
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });
    
    if (!existingFollow) {
      throw new Error("Not following");
    }
    
    const follow = await db.follow.delete({
      where: {
        id: existingFollow.id,
      },
      include: {
        following: true,
      },
    });

    return follow;
    
  
    // Additional logic for unfollowing would go here
  };
  







