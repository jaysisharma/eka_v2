"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Please fill in all fields." };
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        status: "UNREAD"
      }
    });

    // Optional: Revalidate admin messages path if we have one
    revalidatePath("/admin/messages");

    return { success: true };
  } catch (error) {
    console.error("[CONTACT_SUBMIT_ERROR]", error);
    return { success: false, error: "Database error. Please try again later." };
  }
}
