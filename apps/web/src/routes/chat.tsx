import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import type { Message } from "@/features/chat/mock-db.server";

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
  const [sentPrompt, setSentPrompt] = useState<string | null>(null);

  function handlePromptChange(newPrompt: string) {
    setPrompt(newPrompt);
  }

  async function handleSend() {
    if (!prompt.trim()) return;
    const data = prompt.trim();
    setSentPrompt(data);
    setPrompt("");

    try {
      await sendMessage({ data });
      await router.invalidate({ sync: true });
    } finally {
      setSentPrompt(null);
    }
  }

  const displayedMessages: Message[] =
    sentPrompt === null
      ? messages
      : [
          ...messages,
          { id: crypto.randomUUID(), role: "user", content: sentPrompt },
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Thinking...",
          },
        ];

  return (
    <div className="mx-auto flex size-full max-w-2xl flex-col items-center gap-y-6">
      <MessageThread messages={displayedMessages} className="my-6 flex-1" />
      <PromptContainer
        isSending={sentPrompt === null ? false : true}
        handlePromptChange={handlePromptChange}
        handleSend={handleSend}
        prompt={prompt}
      />
    </div>
  );
}
