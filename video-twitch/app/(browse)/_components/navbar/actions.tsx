import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard } from "lucide-react";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {/* If no user, show Sign In button */}
      {!user && (
        <SignInButton>
          <Button>
            Login
          </Button>
        </SignInButton>
      )}

      {/* If user exists, show Dashboard link */}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <div className="flex items-center gap-x-2">
                <Clapperboard />
                <span>Dashboard</span>
              </div>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
