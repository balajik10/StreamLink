import { Sidebar, SidebarSkeleton } from './_components/sidebar';
import {Navbar} from './_components/navbar';  // Make sure you have a Navbar component in the appropriate location
import { Container } from './_components/container';
import { Suspense } from 'react';
const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton/>}>
        <Sidebar/>


        </Suspense>
        <Container>
        {children}
        </Container>
      </div>
    </>
  );
};

export default BrowseLayout;
