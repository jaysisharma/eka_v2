"use server";

import prisma from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = process.env.AUTH_RESEND_KEY ? new Resend(process.env.AUTH_RESEND_KEY) : null;

export async function sendOtp(email: string) {
  const code = crypto.randomInt(100000, 999999).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Upsert verification token
  await prisma.verificationToken.upsert({
    where: { identifier: email },
    update: {
      token: code,
      expires,
    },
    create: {
      identifier: email,
      token: code,
      expires,
    }
  });

  // DEVELOPMENT BYPASS: Log OTP to console if Resend key is missing
  if (!resend) {
    console.log("-----------------------------------------");
    console.log(`DEV OTP FOR ${email}: ${code}`);
    console.log("-----------------------------------------");
    return { success: true, devMode: true };
  }

  // Send Email
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: email,
      subject: "Eka Aerospace - Verification Code",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FFB300; text-transform: uppercase; letter-spacing: 2px;">Eka Aerospace</h2>
          <p>Your security verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; color: #020617;">
            ${code}
          </div>
          <p style="color: #666; font-size: 12px;">This code expires in 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return { success: false, error: "Failed to send verification code" };
  }
}
