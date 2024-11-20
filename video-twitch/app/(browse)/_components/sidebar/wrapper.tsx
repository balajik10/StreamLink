"use client"; // Add this directive at the top to make this a client-side component
import { useState, useEffect } from "react";

import {cn} from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./follwoing";


interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state); // Access the collapsed state
  const isClient = useIsClient(); // Check if this is a client-side render
  if (!isClient) {return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton/>
      <FollowingSkeleton/>
      <RecommendedSkeleton/>

    </aside>
  );
 } // Return null when not a client-side render

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 ",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
