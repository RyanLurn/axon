import { createFileRoute } from "@tanstack/react-router";

import { listMessages } from "@/features/chat/list-messages.function";

export const Route = createFileRoute("/chat")({
  loader: () => listMessages(),
  component: ChatPage,
});

function ChatPage() {
  const messages = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-y-4">
      {messages.map((message) => (
        <p key={message.id}>{message.parts[0]?.text}</p>
      ))}
    </div>
  );
}
