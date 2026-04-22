import { Button } from "@repo/ui/components/button";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

import { useSidebar } from "@/hooks/use-sidebar";

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      data-slot="sidebar-trigger"
      className={cn(className)}
      data-sidebar="trigger"
      variant="ghost"
      size="icon-sm"
      {...props}
    >
      <PanelLeftIcon className="cn-rtl-flip" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
