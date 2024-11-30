import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getStreams = async () => {
  let userId;
  let streams = [];

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  if (userId) {
    // Load streams by user ID
    streams = await db.stream.findMany({
      where: {
        user:{
            NOT:{
                blocking:{
                    some:{
                        blockedId: userId,
                    }
                }
            }
        }
      },
      select:{
        id:true,
        user:true,
        isLive: true,
        name: true,
        thumbnailUrl: true,

      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    // Load all streams
    streams = await db.stream.findMany({
        select:{
            id:true,
            user:true,
            isLive: true,
            name: true,
            thumbnailUrl: true,
    
          },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
