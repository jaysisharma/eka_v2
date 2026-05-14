"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function updateInstitution(name: string) {
  const session = await auth();
  if (!session?.user?.email) return { success: false, error: "Unauthorized" };

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { institutionDetails: name }
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update institution" };
  }
}

export async function upgradeToPremium() {
  const session = await auth();
  if (!session?.user?.email) return { success: false, error: "Unauthorized" };

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { role: "PREMIUM" }
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to upgrade" };
  }
}
