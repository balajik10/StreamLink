"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ 
  isFollowing,
  userId,  // Replace with actual user ID when integrating with a backend API
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handelFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };


  const handelUnFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };


  const onClick = isFollowing? handelUnFollow : handelFollow;

  return (
    <Button 
      disabled={isPending} 
      onClick={onClick} 
      variant="primary"
    >
      {isFollowing?"Unfollow":"Follow"}
    </Button>
  );
};
