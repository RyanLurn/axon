import type { ComponentProps, KeyboardEvent } from "react";

import { cn } from "@repo/ui/lib/utils";

interface PromptInputProps extends Omit<
  ComponentProps<"textarea">,
  "onKeyDown" | "onChange" | "disabled" | "value"
> {
  prompt: string;
  handlePromptChange: (prompt: string) => void;
  isSending: boolean;
  handleSend: () => Promise<void>;
}

export function PromptInput({
  prompt,
  handlePromptChange,
  isSending,
  handleSend,
  className,
  rows = 3,
  ...props
}: PromptInputProps) {
  async function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      await handleSend();
    }
  }

  return (
    <textarea
      onChange={(e) => handlePromptChange(e.target.value)}
      className={cn("field-sizing-content", className)}
      onKeyDown={(e) => void handleKeyDown(e)}
      disabled={isSending}
      value={prompt}
      rows={rows}
      {...props}
    />
  );
}
