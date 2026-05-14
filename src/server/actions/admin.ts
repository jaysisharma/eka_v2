"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveVerification(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        academicStatus: "APPROVED",
        role: "ACADEMIC_PREMIUM",
      },
    });

    revalidatePath("/admin/verification");

    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[APPROVE_VERIFICATION_ERROR]", error);
    }

    return { error: "Failed to approve request" };
  }
}

export async function rejectVerification(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        academicStatus: "REJECTED",
      },
    });

    revalidatePath("/admin/verification");

    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[REJECT_VERIFICATION_ERROR]", error);
    }

    return { error: "Failed to reject request" };
  }
}

export async function updateSystemConfig(_: unknown) {
  revalidatePath("/");

  return { success: true };
}