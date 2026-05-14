"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";

export async function createGuestAccount(email: string) {
  // Check if user exists
  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    // For this flow, we use a consistent pattern for guest-auto-creation 
    // In production, this would send a verification email with a setup link
    const guestPassword = "eka_guest_auth_2026"; 
    const hashedPassword = await bcrypt.hash(guestPassword, 10);
    
    user = await prisma.user.create({
      data: {
        email,
        name: email.split('@')[0],
        password: hashedPassword,
        role: "USER"
      }
    });
  }

  return { success: true, email: user.email };
}
