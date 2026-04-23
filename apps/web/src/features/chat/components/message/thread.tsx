import type { ComponentProps } from "react";

import { cn } from "@repo/ui/lib/utils";

import type { Message } from "@/features/chat/mock-db.server";

import { MessageBubble } from "@/features/chat/components/message/bubble";

interface MessageThreadProps extends ComponentProps<"div"> {
  messages: Message[];
}

export function MessageThread({
  messages,
  className,
  ...props
}: MessageThreadProps) {
  return (
    <div
      className={cn("flex size-full flex-col gap-y-3", className)}
      {...props}
    >
      {messages.map((message) => (
        <MessageBubble message={message} key={message.id} />
      ))}
    </div>
  );
}
