"use client";

import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <aside>
      {children}
    </aside>
  );
};
