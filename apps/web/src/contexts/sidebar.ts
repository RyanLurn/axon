import { createContext } from "react";

export type SidebarContextProps = {
  state: "collapsed" | "expanded";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextProps | null>(null);
