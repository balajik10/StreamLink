import { create } from "zustand";

interface CreatorSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }), // Expanding the sidebar
  onCollapse: () => set({ collapsed: true }), // Collapsing the sidebar
}));
