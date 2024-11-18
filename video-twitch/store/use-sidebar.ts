import { create } from "zustand";

interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }), // Expanding the sidebar
  onCollapse: () => set({ collapsed: true }), // Collapsing the sidebar
}));
