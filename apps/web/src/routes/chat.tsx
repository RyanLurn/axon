import { createFileRoute } from "@tanstack/react-router";

import { MessageThread } from "@/features/chat/components/message/thread";
import { listMessages } from "@/features/chat/functions/list-messages";

export const Route = createFileRoute("/chat")({
  loader: () => listMessages(),
  component: ChatPage,
});

function ChatPage() {
  const messages = Route.useLoaderData();

  return (
    <div className="mx-auto flex size-full max-w-2xl flex-col items-center">
      <MessageThread className="mt-6 flex-1" messages={messages} />
    </div>
  );
}
