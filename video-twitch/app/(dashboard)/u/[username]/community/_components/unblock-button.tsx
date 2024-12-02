"use client";

import { useTransition } from "react";
import { onUnBlock } from "@/actions/block";
import {toast } from "sonner"
import { Button } from "@/components/ui/button";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () =>
    startTransition(() => {
        onUnBlock(userId)
        .then((result) => toast.success(`User ${result.blocked.username} unblocked`))
        .catch(() => toast.error("Something went wrong"));
    });
  

    return (
        <Button
          disabled={isPending}
          onClick={onClick}
          variant="link"
          size="sm"
          className="text-blue-500 w-full"
        >
          Unblock
        </Button>
      );
      
};
