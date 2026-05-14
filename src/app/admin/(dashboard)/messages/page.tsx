import prisma from "@/lib/prisma";
import { MessagesClient } from "./messages-client";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="h-[calc(100vh-180px)] overflow-hidden">
      <MessagesClient initialMessages={messages} />
    </div>
  );
}
