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
  placeholder = "Enter your prompt",
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
      className={cn("resize-none focus:outline-none", className)}
      onChange={(e) => handlePromptChange(e.target.value)}
      onKeyDown={(e) => void handleKeyDown(e)}
      placeholder={placeholder}
      disabled={isSending}
      value={prompt}
      rows={rows}
      {...props}
    />
  );
}
