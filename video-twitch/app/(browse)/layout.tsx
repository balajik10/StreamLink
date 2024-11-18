import { Sidebar } from './_components/sidebar';
import {Navbar} from './_components/navbar';  // Make sure you have a Navbar component in the appropriate location
const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar/>
        {children}
      </div>
    </>
  );
};

export default BrowseLayout;
