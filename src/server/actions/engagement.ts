"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function likePaper(paperId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Login required" };

  const userId = session.user.id;

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_paperId: {
          userId,
          paperId,
        }
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
    } else {
      await prisma.like.create({
        data: { userId, paperId }
      });
    }

    revalidatePath(`/research/${paperId}`);
    return { success: true };
  } catch (error) {
    console.error("Like action failed:", error);
    return { error: "Failed to process request" };
  }
}

export async function addComment(paperId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Login required" };

  const userId = session.user.id;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        paperId,
      }
    });

    revalidatePath(`/research/${paperId}`);
    return { success: true, comment };
  } catch (error) {
    console.error("Comment failed:", error);
    return { error: "Failed to post comment" };
  }
}

export async function followUser(followingId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Login required" };

  const followerId = session.user.id;
  if (followerId === followingId) return { error: "Self-following restricted" };

  try {
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        }
      }
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: { id: existingFollow.id }
      });
    } else {
      await prisma.follow.create({
        data: { followerId, followingId }
      });
    }

    revalidatePath("/researchers"); // Or specific profile path
    return { success: true };
  } catch (error) {
    console.error("Follow action failed:", error);
    return { error: "Failed to process request" };
  }
}
