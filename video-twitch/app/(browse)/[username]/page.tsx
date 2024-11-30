import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  // Fetch user by username
  const user = await getUserByUsername(params.username);

  // If user is not found, trigger 404
  if (!user || !user.stream) {
    notFound();
  }

  // Check if the current user is following this user
  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked){
    notFound();
  }



  return (
    <StreamPlayer
    user={user}
    stream={user.stream}
    isFollowing={isFollowing}
    />

  );
};

export default UserPage;
