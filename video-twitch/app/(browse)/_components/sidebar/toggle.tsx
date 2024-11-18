"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine ,ArrowRightFromLine} from "lucide-react";
import{Hint} from "@/components/hint";
export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state)=>state); // Correct usage of useSidebar hook

  const label = collapsed ? "Expand" : "Collapse"; // Correct the label assignment

//   const handleToggle = () => {
//     if (collapsed) {
//       onExpand(); // Expand the sidebar
//     } else {
//       onCollapse(); // Collapse the sidebar
//     }
//   };

  return (
    <>
    {collapsed &&(
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
            <Hint label={label} side="right" asChild>
            <Button 
            onClick={onExpand}
            variant="ghost" 
            className="h-auto p-2">
                <ArrowRightFromLine className="h-4 w-4"/>
            </Button>
            </Hint>
            
        </div>
    )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
            <p className="font-semibold text-primary">
                For you
            </p>
            <Hint label={label} side="right" asChild>
            <Button 
            onClick={onCollapse}
            className="h-auto p-2 ml-auto " variant="ghost">
                <ArrowLeftFromLine className="h-4 w-4"/>
            </Button>
            </Hint>

        </div>
      )}
    </>
  );
};
