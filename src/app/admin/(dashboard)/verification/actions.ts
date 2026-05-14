"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { VerificationStatus, Role } from "@prisma/client";

export async function updateVerificationStatus(userId: string, status: VerificationStatus) {
  try {
    const role = status === "APPROVED" ? Role.ACADEMIC_PREMIUM : Role.USER;
    
    await prisma.user.update({
      where: { id: userId },
      data: { 
        academicStatus: status,
        role: role
      },
    });
    
    revalidatePath("/admin/verification");
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to update verification status:", error);
    return { success: false };
  }
}
