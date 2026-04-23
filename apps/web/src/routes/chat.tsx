import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { PromptContainer } from "@/features/chat/components/prompt/container";
import { MessageThread } from "@/features/chat/components/message/thread";
import { listMessages } from "@/features/chat/functions/list-messages";
import { sendMessage } from "@/features/chat/functions/send-message";

export const Route = createFileRoute("/chat")({
  loader: () => listMessages(),
  component: ChatPage,
});

function ChatPage() {
  const router = useRouter();
  const messages = Route.useLoaderData();
  const [prompt, setPrompt] = useState("");
  const [isSending, setIsSending] = useState(false);

  function handlePromptChange(newPrompt: string) {
    setPrompt(newPrompt);
  }

  async function handleSend() {
    if (!prompt.trim()) return;
    const data = prompt.trim();
    setPrompt("");
    setIsSending(true);

    try {
      await sendMessage({ data });
      await router.invalidate();
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="mx-auto flex size-full max-w-2xl flex-col items-center">
      <MessageThread className="mt-6 flex-1" messages={messages} />
      <PromptContainer
        handlePromptChange={handlePromptChange}
        handleSend={handleSend}
        isSending={isSending}
        prompt={prompt}
      />
    </div>
  );
}
