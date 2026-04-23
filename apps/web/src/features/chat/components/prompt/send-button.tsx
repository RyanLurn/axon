import type { ComponentProps } from "react";

import { Spinner } from "@repo/ui/components/spinner";
import { Button } from "@repo/ui/components/button";
import { Send } from "lucide-react";

interface SendButtonProps extends Omit<
  ComponentProps<typeof Button>,
  "disabled" | "onClick"
> {
  isSending: boolean;
  handleSend: () => Promise<void>;
}

export function SendButton({
  isSending,
  handleSend,
  size = "icon",
  ...props
}: SendButtonProps) {
  return (
    <Button
      onClick={() => void handleSend()}
      disabled={isSending}
      size={size}
      {...props}
    >
      {isSending ? <Spinner /> : <Send />}
    </Button>
  );
}
