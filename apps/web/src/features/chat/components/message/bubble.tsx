import type { ComponentProps } from "react";

import { cn } from "@repo/ui/lib/utils";

import type { Message } from "@/features/chat/mock-db.server";

interface MessageBubbleProps extends ComponentProps<"div"> {
  message: Message;
}

export function MessageBubble({
  message,
  className,
  ...props
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "w-fit max-w-4/5 rounded-lg p-3",
        message.role === "user"
          ? "ml-auto justify-end bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    >
      <p>{message.content}</p>
    </div>
  );
}
