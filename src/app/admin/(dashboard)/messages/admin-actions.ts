"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id }
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("[DELETE_MESSAGE_ERROR]", error);
    return { success: false, error: "Failed to delete message." };
  }
}

export async function markMessageAsRead(id: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { status: "READ" }
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("[MARK_READ_ERROR]", error);
    return { success: false, error: "Failed to update message status." };
  }
}

export async function replyToMessage(id: string, replyText: string) {
  try {
    // In a real app, this would send an email. 
    // For now, we'll mark as read and log the reply.
    await prisma.contactMessage.update({
      where: { id },
      data: { status: "READ" }
    });
    
    console.log(`Reply sent to message ${id}: ${replyText}`);
    
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("[REPLY_MESSAGE_ERROR]", error);
    return { success: false, error: "Failed to send reply." };
  }
}
