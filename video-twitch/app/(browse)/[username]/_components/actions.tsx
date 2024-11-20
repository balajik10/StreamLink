"use client";

import { Button } from "@/components/ui/button";
import { onFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
}

export const Actions = ({ isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onFollow("123")
        .then(() => toast.success("Followed the user"))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Button 
      disabled={isFollowing || isPending} 
      onClick={onClick} 
      variant="primary"
    >
      Follow
    </Button>
  );
};
