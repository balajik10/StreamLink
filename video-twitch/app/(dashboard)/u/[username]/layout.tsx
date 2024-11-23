import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/Sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

// Mark as async for server-side execution
const CreatorLayout = async ({ 
  params, 
  children 
}: CreatorLayoutProps) => {
  // Ensure params is available and handle it asynchronously
  const self = await getSelfByUsername(params.username);

  if (!self) {
    // Redirect to home if the user does not exist or is not authorized
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>
          {children}
        </Container>
      </div>
    </>
  );
};

export default CreatorLayout;
