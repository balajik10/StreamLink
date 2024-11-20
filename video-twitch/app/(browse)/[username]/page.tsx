import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  // Fetch user by username
  const user = await getUserByUsername(params.username);

  // If user is not found, trigger 404
  if (!user) {
    notFound();
  }

  // Check if the current user is following this user
  const isFollowing = await isFollowingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>User ID: {user.id}</p>
      <p>Is Following: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing}/>
    </div>
  );
};

export default UserPage;
