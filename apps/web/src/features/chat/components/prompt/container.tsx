import type { ComponentProps } from "react";

import { cn } from "@repo/ui/lib/utils";

import { SendButton } from "@/features/chat/components/prompt/send-button";
import { PromptInput } from "@/features/chat/components/prompt/input";

interface PromptContainerProps extends ComponentProps<"div"> {
  prompt: string;
  handlePromptChange: (prompt: string) => void;
  isSending: boolean;
  handleSend: () => Promise<void>;
}

export function PromptContainer({
  prompt,
  handlePromptChange,
  isSending,
  handleSend,
  className,
  ...props
}: PromptContainerProps) {
  return (
    <div
      className={cn("sticky bottom-5 flex w-full flex-col gap-y-2", className)}
      {...props}
    >
      <PromptInput
        handlePromptChange={handlePromptChange}
        handleSend={handleSend}
        isSending={isSending}
        prompt={prompt}
      />
      <SendButton
        className="ml-auto justify-end"
        handleSend={handleSend}
        isSending={isSending}
      />
    </div>
  );
}
