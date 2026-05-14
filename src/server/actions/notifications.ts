"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20
  });
}

export async function markAsRead(notificationId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Login required" };

  try {
    await prisma.notification.update({
      where: { 
        id: notificationId,
        userId: session.user.id // Security check
      },
      data: { isRead: true }
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to mark as read" };
  }
}

export async function markAllAsRead() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Login required" };

  try {
    await prisma.notification.updateMany({
      where: { userId: session.user.id, isRead: false },
      data: { isRead: true }
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to mark all as read" };
  }
}

export async function createNotification(userId: string, data: { title: string, message: string, type: string, link?: string }) {
  // This is a server-side helper, not directly called from client usually
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        ...data
      }
    });
    return notification;
  } catch (error) {
    console.error("Notification creation failed:", error);
    return null;
  }
}
